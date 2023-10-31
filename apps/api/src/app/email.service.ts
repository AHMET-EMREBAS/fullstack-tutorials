import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { ENV } from './environment';

@Injectable()
export class EmailService {
  transporter() {
    return createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: ENV.EMAIL_ADDRESS,
        pass: ENV.EMAIL_PASSWORD,
      },
    });
  }

  async info(options?: MailOptions) {
    return await this.send({
      ...options,
      from: `"${ENV.ORG_NAME} | 💁🏻‍♂️ Information" <${ENV.INFO_EMAIL}>`,
      subject: 'Info | ' + options?.subject,
    });
  }

  async security(options?: MailOptions & { code: string }) {
    return await this.send({
      ...options,
      from: `"${ENV.ORG_NAME} | 🔐 Security" <${ENV.SECURITY_EMAIL}>`,
      subject: 'Security | ' + options?.subject,
    });
  }

  async send({
    from,
    to,
    subject,
    text,
    code,
  }: MailOptions & { code?: string }) {
    return await this.transporter().sendMail({
      from,
      to,
      subject,
      text: `${text}\n${code ? `[ ${code}]` : ''}`,
    });
  }
}
