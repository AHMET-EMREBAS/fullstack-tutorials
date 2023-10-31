import { Body, Controller, Post } from '@nestjs/common';
import {
  LoginDto,
  SignupDto,
  ForgotPasswordDto,
  LoginWithCodeDto,
  ResetPasswordWithCodeDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { OAuth2Client } from 'google-auth-library/build/src';
import { AuthService } from './auth.service';
import { IsPublic } from './meta';
import { EmailService } from '../email';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @IsPublic()
  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log(body)
    const access_code = await this.authService.login(body);
    return { access_code };
  }

  @IsPublic()
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    const access_code = await this.authService.signup({
      ...body,
    });

    this.emailService.security({
      to: body.username,
      subject: 'Welcome',
      text: 'Thanks for choosing our service.',
    });

    this.eventEmitter.emit('auth.signup', body);

    return { access_code };
  }

  @IsPublic()
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body);
  }

  @Post('login-with-code')
  async loginWithCode(@Body() body: LoginWithCodeDto) {
    const access_code = await this.authService.loginWithCode(body);
    return { access_code };
  }

  @Post('reset-password-with-code')
  async resetPasswordWithCode(@Body() body: ResetPasswordWithCodeDto) {
    const access_code = await this.authService.resetPasswordWithCode(body);
    return { access_code };
  }

  @Post('signup-with-google')
  async signupWithGoogle(@Body() body: any) {
    console.log(await this.getDecodedOAuthJwtGoogle(body.credential));
  }

  @Post('login-with-google')
  async signInWithGoogle(@Body() body: any) {
    console.log(await this.getDecodedOAuthJwtGoogle(body.credential));
  }

  async getDecodedOAuthJwtGoogle(token: string) {
    const CLIENT_ID_GOOGLE = process.env['GOOGLE_CLIENT_ID'];

    try {
      const client = new OAuth2Client(CLIENT_ID_GOOGLE);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID_GOOGLE,
      });

      return ticket;
    } catch (error) {
      return { status: 500, data: error };
    }
  }
}
