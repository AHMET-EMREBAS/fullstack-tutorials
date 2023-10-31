import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';
import { compareSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import {
  ForgotPasswordDto,
  LoginDto,
  LoginWithCodeDto,
  ResetPasswordWithCodeDto,
  SignupDto,
} from './dto';

@Injectable()
export class AuthService {
  private readonly securityCodeMap = new Map<string, string>();

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  setSecurityCode(username: string) {
    const code = v4();
    this.securityCodeMap.set(username, code);
    return code;
  }

  async findByUsername(username: string) {
    return await this.userRepo.findOneBy({ username });
  }

  /**
   * For testing
   * Get security code without updating it.
   * @param username
   * @returns
   */
  __getSecurityCode(username: string) {
    return this.securityCodeMap.get(username);
  }

  /**
   * Get the last security code and set a new one.
   * @param username
   * @returns
   */
  getSecurityCode(username: string) {
    const code = this.securityCodeMap.get(username);
    this.securityCodeMap.set(username, v4());
    return code;
  }

  sign(body: Partial<User>) {
    return this.jwtService.sign({ ...body });
  }
  verify(token: string): User {
    return this.jwtService.verify(token);
  }

  private comparePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async login(body: LoginDto) {
    const found = await this.findByUsername(body.username);
    if (found?.password) {
      if (this.comparePassword(body.password, found?.password)) {
        return this.sign(found);
      } else {
        throw new UnauthorizedException('Wrong password!');
      }
    }

    throw new NotFoundException('User not found!');
  }

  async signup(body: SignupDto) {
    const found = await this.findByUsername(body.username);
    if (found) {
      throw new UnprocessableEntityException(`Username's been already token!`);
    }
    const saved = await this.userRepo.save({ ...body, isAdmin: true });
    return this.sign(saved);
  }

  async forgotPassword(body: ForgotPasswordDto) {
    const found = await this.findByUsername(body.username);

    if (found) return { message: `Check your inbox` };

    throw new UnauthorizedException('User not found!');
  }

  async loginWithCode(body: LoginWithCodeDto) {
    const foundUser = await this.userRepo.findOneBy({
      username: body.username,
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const securityCode = this.getSecurityCode(body.username);
    if (securityCode) {
      if (securityCode === body.code) {
        return this.sign(foundUser);
      }
    }
    throw new UnauthorizedException();
  }

  async resetPasswordWithCode(body: ResetPasswordWithCodeDto) {
    const foundUser = await this.userRepo.findOneBy({
      username: body.username,
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const securityCode = this.getSecurityCode(body.username);

    if (securityCode) {
      if (securityCode === body.code) {
        await this.userRepo.update(foundUser.id!, {
          password: body.password,
        });

        const updatedUser = await this.userRepo.findOneBy({
          id: foundUser.id,
        });
        return this.sign(updatedUser!);
      }
    }
    throw new UnauthorizedException();
  }
}
