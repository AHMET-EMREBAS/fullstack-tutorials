import { Exclude, Expose } from 'class-transformer';
import { LoginDto } from './login.dto';
import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class SignupDto extends LoginDto {
  @ApiProperty()
  @Expose()
  @Length(3, 30)
  @IsNotEmpty()
  orgname!: string;
}
