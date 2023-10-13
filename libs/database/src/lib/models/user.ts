import { BaseModel } from '../common';
import { Column, Entity, ValueTransformer } from 'typeorm';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { IUser } from '@techbir/common';
import { hashSync, genSaltSync } from 'bcrypt';

const PasswordTransformer: () => ValueTransformer = () => {
  return {
    from: (value) => value,
    to: (value) => hashSync(value, genSaltSync(8)),
  };
};

@Entity()
export class User extends BaseModel implements IUser {
  @Column({ type: 'varchar', unique: true, default: '' })
  username = 'username@username.com';

  @Column({ type: 'varchar', default: '', transformer: PasswordTransformer() })
  password = 'SomePassword';
}

@Exclude()
export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    default: 'username@company.com',
    format: 'email',
    description: 'Unique username',
  })
  @Expose()
  @IsEmail()
  username = '';

  @ApiProperty({
    type: 'string',
    default: 'Strong password',

    format: 'password',
    description:
      'Strong password with at least one uppercase, one lowercase, one number, one special character.',
  })
  @Expose()
  @IsStrongPassword()
  password = '';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
