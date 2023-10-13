import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_OPTIONS } from './jwt-options';

export type AuthPayload = {
  sub: number;
};

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}
  sign(payload: AuthPayload) {
    return this.jwt.sign(payload, {
      secret: JWT_OPTIONS.secret,
      expiresIn: JWT_OPTIONS.signOptions?.expiresIn,
    });
  }

  verify(token: string) {
    return this.jwt.verify(token, { secret: JWT_OPTIONS.secret });
  }
}
