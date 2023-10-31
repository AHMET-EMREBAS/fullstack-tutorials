import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Exclude()
export class ForgotPasswordDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  username!: string;
}
