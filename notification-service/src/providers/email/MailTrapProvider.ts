import nodemailer, { Transporter } from 'nodemailer';
import IEmailProvider from '../../interfaces/IEmailProviderInterface';


export default class MailTrapProvider implements IEmailProvider {
  private transporter: Transporter;

  constructor() {
    console.log(process.env.MAILTRAP_HOST, process.env.MAILTRAP_PORT, process.env.MAILTRAP_USERNAME, process.env.MAILTRAP_PASSWORD);
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USERNAME!,
        pass: process.env.MAILTRAP_PASSWORD!,
      },
    });
  }

  async send(email: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER!,
      to: email,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendBulk(emails: string[], subject: string, html: string): Promise<void> {

    emails.forEach(email => {
      const mailOptions = {
            from: process.env.EMAIL_USER!,
            to: email,
            subject,
            html,
          };

        this.transporter.sendMail(mailOptions);
    })
   
  }
}
