import { Inject, Injectable, Scope, ValueProvider } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export type EmailOptions = {
  email: string;
  password: string;
  orgName: string;
  infoEmail: string;
  securityEmail: string;
  qaEmail: string;
  website: string;
};

export const EMAIL_OPTIONS = 'EMAIL_OPTIONS';

export function provideEmailOptions(options: EmailOptions): ValueProvider {
  return {
    provide: EMAIL_OPTIONS,
    useValue: options,
  };
}

@Injectable({ scope: Scope.REQUEST })
export class EmailService {
  constructor(
    @Inject(EMAIL_OPTIONS) private readonly emailOptions: EmailOptions
  ) {}
  transporter() {
    return createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: this.emailOptions.email,
        pass: this.emailOptions.password,
      },
    });
  }

  async info(options?: MailOptions) {
    return await this.send({
      ...options,
      from: `"${this.emailOptions.orgName} | 💁🏻‍♂️ Information" <${this.emailOptions.infoEmail}>`,
      subject: 'Info | ' + options?.subject,
    });
  }

  async security(options?: MailOptions) {
    return await this.send({
      ...options,
      from: `"${this.emailOptions.orgName} | 🔐 Security" <${this.emailOptions.securityEmail}>`,
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
