import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { OnEvent } from '@nestjs/event-emitter';
import { MailOptions } from 'nodemailer/lib/json-transport';

/**
 * Service is for sending email notification on events
 */
@Injectable()
export class EmailEventsService {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('user.reset-password')
  sendResetPasswordEmail(args: MailOptions) {
    this.emailService.security({ ...args });
  }

  @OnEvent('user.send-sso')
  sendSSO(args: MailOptions) {
    this.emailService.security({ ...args });
  }
}
