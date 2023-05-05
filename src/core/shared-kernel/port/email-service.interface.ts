export const EMAIL_SENDER_NAME = 'Mindspace';

export type EmailAttachment = {
  id: string;
  mimeType: 'text/calendar' | string;
  contentEncoding?: 'base64';
  content: string;
  name: string;
};

export interface EmailServiceInterface {
  sendEmail(
    from: string,
    to: string,
    subject: string,
    body: string,
    attachments?: EmailAttachment[],
  ): Promise<boolean>;
}

export const EmailServiceInterfaceType = Symbol.for('EmailServiceInterface');
