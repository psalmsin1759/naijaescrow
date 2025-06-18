export default interface IEmailProvider {
     send(email: string, subject: string, body: string ): Promise<void>;
     sendBulk(emails: string[], subject: string, body: string) : Promise<void>;
}