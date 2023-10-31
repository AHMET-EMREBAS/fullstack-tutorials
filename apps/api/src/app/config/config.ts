import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EmailOptions } from '@techbir/core';
import { v4 } from 'uuid';

export const UserConfig = {
  ROOT_USERNAME: process.env.APP_USERNAME,
  ROOT_PASSWORD: process.env.APP_PASSWORD,
};

export const JwtConfig: JwtModuleOptions = {
  secret: process.env.SECRET || v4(),
  global: true,
  signOptions: {
    expiresIn: '30d',
  },
};

export const EmailConfig: EmailOptions = {
  email: process.env.EMAIL_ADDRESS,
  password: process.env.EMAIL_PASSWORD,
  infoEmail: process.env.INFO_EMAIL,
  securityEmail: process.env.SECURITY_EMAIL,
  qaEmail: process.env.QA_EMAIL,
  orgName: process.env.ORG_NAME,
  website: process.env.WEBSITE || 'https://emrebas.tech',
};

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: './tmp/database.sqlite',
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: true,
};
