
import MailTrapProvider from '../providers/email/MailTrapProvider';
import SendGridProvider from '../providers/email/SendGridProvider';
import EmailProviderInterface from '../interfaces/IEmailProviderInterface';
import emailTemplate from '../templates/emailtemplate';


function getEmailProvider(): EmailProviderInterface {
  switch (process.env.EMAIL_PROVIDER) {
    case 'mailtrap':
      return new MailTrapProvider();
    case 'nodemailer':
      return new SendGridProvider();
    default:
      return new MailTrapProvider();
  }
}

const provider = getEmailProvider();



export default async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  try {
    
    const html = emailTemplate( body);
    await provider.send(to, subject, html);
    console.log(`[EmailService] Sent email to ${to}`);
  } catch (error: any) {
    console.error('[EmailService] Failed to send email:', error.message);
    throw error;
  }
}
