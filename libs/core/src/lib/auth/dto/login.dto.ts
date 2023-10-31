import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

@Exclude()
export class LoginDto {
  @ApiProperty()
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  username!: string;

  @ApiProperty()
  @Expose()
  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;
}
