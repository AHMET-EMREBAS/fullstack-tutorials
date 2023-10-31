import { LoginDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class ResetPasswordWithCodeDto extends LoginDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @MaxLength(100)
  code!: string;
}
