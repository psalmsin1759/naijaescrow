
import TwilioProvider from '../providers/sms/TwilioProvider';
import SMSProviderInterface from '../interfaces/ISMSProviderInterface';


function getSMSProvider(): SMSProviderInterface {
  switch (process.env.SMS_PROVIDER) {
    case 'twilio':
      return new TwilioProvider();
    default:
      return new TwilioProvider();
  }
}

const provider = getSMSProvider();

export default async function sendSMS(phoneNumber: string, body: string): Promise<void> {
  try {
    await provider.send(phoneNumber, body);
    console.log(`[SMSService] Sent sms to ${phoneNumber}`);
  } catch (error: any) {
    console.error('[SMSService] Failed to send phone:', error.message);
    throw error;
  }
}
