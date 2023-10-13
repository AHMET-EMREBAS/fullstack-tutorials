import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthTokenObject, BasicAuthController } from '@techbir/common';
import { User } from '@techbir/database';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { IsPublic } from './auth-meta';
import { AuthService } from './auth.service';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController implements BasicAuthController {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly authService: AuthService
  ) {}

  @IsPublic()
  @ApiOkResponse({ description: 'Upon successful login' })
  @ApiUnauthorizedResponse({
    description: 'Username or password does not match!',
  })
  @ApiNotFoundResponse({ description: 'User with username does not exist!' })
  @Post('login')
  async login(
    @Query('username') username: string,
    @Query('password') password: string
  ): Promise<AuthTokenObject> {
    const foundUser = await this.userRepo.findOneByOrFail({ username });

    if (foundUser) {
      const isPasswordMatch = await compare(password, foundUser.password);

      if (isPasswordMatch) {
        const authToken = this.authService.sign({ sub: foundUser.id });

        return { ...new AuthTokenObject({ authToken }) };
      } else {
        throw new UnauthorizedException('Password is wrong!');
      }
    } else {
      throw new NotFoundException('User not found!');
    }
  }

  @Get('has-session')
  hasSession() {
    return '';
  }
}
