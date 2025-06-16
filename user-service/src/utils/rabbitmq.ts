import amqp, { ChannelModel, Channel } from 'amqplib';

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

export async function connectRabbitMQ(): Promise<void> {
  try {
    if (!connection) {
      connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();
      console.log('[RabbitMQ] Connected');
    }
  } catch (error) {
    console.error('[RabbitMQ] Connection error:', error);
    throw error;
  }
}

export async function sendToQueue(queue: string, message: unknown): Promise<void> {
  if (!channel) {
    await connectRabbitMQ();
    if (!channel) {
      throw new Error('Failed to create RabbitMQ channel');
    }
  }

  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
}
