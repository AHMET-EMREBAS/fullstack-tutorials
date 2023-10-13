import { Logger, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@techbir/database';
import { Repository } from 'typeorm';
import { AuthController } from './auth.controller';
import { UserController } from './user';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards';
import { JWT_OPTIONS } from './jwt-options';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register(JWT_OPTIONS)
  ],
  providers: [JwtService, AuthService, AuthGuard],
  exports:[AuthService],
  controllers: [AuthController, UserController],
})
export class AuthModule {
  constructor(@InjectRepository(User) userRepo: Repository<User>) {
    userRepo
      .save({
        username: 'root@root.com',
        password: 'password',
      })
      .then(() => {
        Logger.log('Root user is created!', 'AuthModule');
      })
      .catch((err) => {
        Logger.error(err.message, 'AuthModule');
      });
  }
}
