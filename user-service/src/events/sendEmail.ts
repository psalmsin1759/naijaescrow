import { sendToQueue } from '../utils/rabbitmq';
import { EmailMessage } from '../utils/types';


export async function sendEmail(email: string, subject: string, body: string): Promise<void> {
  try {
    const message = {
      type: 'send_email',
      data: {
        to: email,
        subject,
        body,
      } as EmailMessage,
    };

    await sendToQueue('email_notification', message);
    console.log(`[EmailService] Queued email to ${email}`);
  } catch (error: any) {
    console.error('[EmailService] Failed to queue email:', error.message);
  }
}
