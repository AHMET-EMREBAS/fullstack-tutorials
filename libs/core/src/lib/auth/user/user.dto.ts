import { PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty()
  @Length(3, 30)
  @IsNotEmpty()
  firstName!: string;

  @Expose()
  @ApiProperty()
  @Length(3, 30)
  @IsNotEmpty()
  lastName!: string;

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
  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}

@Exclude()
export class UpdateUserDto extends PartialType(UserDto) {}
