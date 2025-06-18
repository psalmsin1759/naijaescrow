import { sendToQueue } from '../utils/rabbitmq';
import { EmailMessage } from '../utils/types';


export async function sendEmail(email: string, subject: string, body: string): Promise<void> {
  try {
    const message = {
      type: 'escrow_sendEmail',
      data: {
        to: email,
        subject,
        body,
      } as EmailMessage,
    };

    await sendToQueue('escrow_sendEmail', message);
    console.log(`[EmailService] Queued email to ${email}`);
  } catch (error: any) {
    console.error('[EmailService] Failed to queue email:', error.message);
  }
}
