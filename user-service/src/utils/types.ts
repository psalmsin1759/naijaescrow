export interface EmailMessage {
  to: string;
  subject: string;
  body: string;
}

export interface ResponseResult {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}