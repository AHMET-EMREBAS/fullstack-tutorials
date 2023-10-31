import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { Config } from '../config';

@Injectable()
export class EmailService {
  transporter() {
    return createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: Config.EMAIL_ADDRESS,
        pass: Config.EMAIL_PASSWORD,
      },
    });
  }

  async info(options?: MailOptions) {
    return await this.send({
      ...options,
      from: `"${Config.ORG_NAME} | 💁🏻‍♂️ Information" <${Config.INFO_EMAIL}>`,
      subject: 'Info | ' + options?.subject,
    });
  }

  async security(options?: MailOptions) {
    return await this.send({
      ...options,
      from: `"${Config.ORG_NAME} | 🔐 Security" <${Config.SECURITY_EMAIL}>`,
      subject: 'Security | ' + options?.subject,
    });
  }

  async send({ from, to, subject, text }: MailOptions) {
    return await this.transporter().sendMail({
      from,
      to,
      subject,
      text,
    });
  }
}
