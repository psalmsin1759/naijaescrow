import dotenv from 'dotenv';
dotenv.config();
import amqp, { ChannelModel, Channel, ConsumeMessage } from 'amqplib';

import sendEmail from './services/email.service';
//import sendSMS from './services/sms.service';
//import sendPush from '@/services/pushNotificationService';


const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

interface NotificationMessage {
  to?: string;
  subject?: string;
  body?: string;
  phone?: string;
  message?: string;
  title?: string;
}

type QueueHandler = (data: NotificationMessage) => Promise<void>;

const QUEUES: Record<string, QueueHandler> = {
  escrow_sendEmail: async (data: NotificationMessage) => {
    if (data.to && data.subject && data.body) {
      await sendEmail(data.to, data.subject, data.body);
    }
  },
  /*escrow_sendSMS: async (data: NotificationMessage) => {
    if (data.phone && data.message) {
      await sendSMS(data.phone, data.message);
    }
  },
   push_notification: async (data: NotificationMessage) => {
    if (data.title && data.message) {
      await sendPush(data.title, data.message);
    }
  }, */
};

async function startNotificationConsumers(): Promise<void> {
  try {
    const connection: ChannelModel = await amqp.connect(RABBITMQ_URL);
    const channel: Channel = await connection.createChannel();
    console.log(`[NotificationConsumer] Connected to RabbitMQ`);

    for (const [queueName, handler] of Object.entries(QUEUES)) {
      await channel.assertQueue(queueName, { durable: true });

      console.log(`[NotificationConsumer] Listening on ${queueName}...`);

      channel.consume(
        queueName,
        async (msg: ConsumeMessage | null) => {
          if (msg !== null) {
            try {
              const message = JSON.parse(msg.content.toString());
              await handler(message.data);
              channel.ack(msg);
            } catch (err: any) {
              console.error(`[NotificationConsumer] Error in ${queueName}:`, err.message);
              channel.nack(msg, false, false); 
            }
          }
        },
        { noAck: false }
      );
    }
  } catch (err: any) {
    console.error('[NotificationConsumer] Failed to connect:', err.message);
  }
}

startNotificationConsumers();
