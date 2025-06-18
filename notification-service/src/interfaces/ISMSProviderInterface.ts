export default interface ISMSProvider {
     send(phoneNumber: string,  body: string ): Promise<void>;
     sendBulk(phoneNumbers: string[], body: string) : Promise<void>;
}