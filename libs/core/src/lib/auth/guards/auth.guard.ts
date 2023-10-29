import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_TOKEN } from '../auth-meta';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {}

  private isPublic(context: ExecutionContext) {
    const __isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_TOKEN, [
      context.getClass(),
      context.getHandler(),
    ]);

    return __isPublic;
  }

  private getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest<Request>();
  }

  canActivate(context: ExecutionContext) {
    if (this.isPublic(context)) {
      return true;
    }

    const req = this.getRequest(context);

    const token = this.extractTokenFromHeader(req);

    if (token) {
      try {
        const verified = this.authService.verify(token);

        if (verified) {
          return true;
        }
      } catch (err) {
        throw new UnauthorizedException('Session expired!');
      }
    }
    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
