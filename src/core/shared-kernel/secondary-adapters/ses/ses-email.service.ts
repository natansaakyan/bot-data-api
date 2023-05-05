import { Injectable } from '@nestjs/common';
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
  SendEmailCommandOutput,
  SendRawEmailCommand,
  SendRawEmailCommandInput,
  SendRawEmailCommandOutput,
} from '@aws-sdk/client-ses';
import MailComposer = require('nodemailer/lib/mail-composer');
import {
  EmailAttachment,
  EmailServiceInterface,
  EMAIL_SENDER_NAME,
} from '../../port/email-service.interface';

@Injectable()
export class SesEmailService implements EmailServiceInterface {
  private readonly sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({});
  }

  public async sendEmail(
    from: string,
    to: string,
    subject: string,
    body: string,
    attachments?: EmailAttachment[],
  ): Promise<boolean> {
    const sender = `${EMAIL_SENDER_NAME} <${from}>`;
    const result =
      attachments?.length > 0
        ? await this.sendRawEmail(sender, to, subject, body, attachments)
        : await this.sendSimpleEmail(sender, to, subject, body);
    return !!result.MessageId;
  }

  private async sendSimpleEmail(
    from: string,
    to: string,
    subject: string,
    body: string,
  ): Promise<SendEmailCommandOutput> {
    const params: SendEmailCommandInput = {
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: body,
          },
        },
      },
      Destination: {
        ToAddresses: [to],
      },
      Source: from,
    };
    const command = new SendEmailCommand(params);
    return await this.sesClient.send(command);
  }

  private async sendRawEmail(
    from: string,
    to: string,
    subject: string,
    body: string,
    attachments: EmailAttachment[],
  ): Promise<SendRawEmailCommandOutput> {
    const mail = new MailComposer({
      subject,
      html: body,
      attachments: attachments.map((a) => ({
        cid: a.id,
        contentType: a.mimeType,
        content: a.content,
        filename: a.name,
      })),
    });
    const compiledMail = await mail.compile().build();
    const params: SendRawEmailCommandInput = {
      Destinations: [to],
      Source: from,
      RawMessage: {
        Data: compiledMail,
      },
    };
    const command = new SendRawEmailCommand(params);
    return await this.sesClient.send(command);
  }
}
