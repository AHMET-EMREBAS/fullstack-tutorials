import { PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  username!: string;

  @Expose()
  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}

@Exclude()
export class UpdateUserDto extends PartialType(UserDto) {}
