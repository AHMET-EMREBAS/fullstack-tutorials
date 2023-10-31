import { DynamicModule, Module } from '@nestjs/common';
import {
  EmailOptions,
  EmailService,
  provideEmailOptions,
} from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {
  static register(options: EmailOptions): DynamicModule {
    const emailOptionsProvider = provideEmailOptions(options);
    return {
      global: true,
      module: EmailModule,
      providers: [emailOptionsProvider],
      exports: [emailOptionsProvider],
    };
  }
}
