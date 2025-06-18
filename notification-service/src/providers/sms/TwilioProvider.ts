import ISMSProvider from '../../interfaces/ISMSProviderInterface';
import { Twilio } from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromPhone = process.env.TWILIO_PHONE_NUMBER!;

const client = new Twilio(accountSid, authToken);

export default class TwilioProvider implements ISMSProvider {
  async send(phoneNumber: string, body: string): Promise<void> {
    try {
      await client.messages.create({
        body,
        from: fromPhone,
        to: phoneNumber,
      });

      console.log(`[TwilioProvider] SMS sent to ${phoneNumber}`);
    } catch (error: any) {
      console.error(`[TwilioProvider] Failed to send SMS to ${phoneNumber}:`, error.message);
      throw error;
    }
  }

  async sendBulk(phoneNumbers: string[], body: string): Promise<void> {
    const sendPromises = phoneNumbers.map((phone) =>
      client.messages.create({
        body,
        from: fromPhone,
        to: phone,
      })
    );

    try {
      await Promise.all(sendPromises);
      console.log(`[TwilioProvider] Bulk SMS sent to ${phoneNumbers.length} recipients`);
    } catch (error: any) {
      console.error('[TwilioProvider] Bulk SMS sending failed:', error.message);
      throw error;
    }
  }
}
