import { Exclude, Expose } from 'class-transformer';
import { LoginDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

@Exclude()
export class SignupDto extends LoginDto {
  @ApiProperty()
  @Expose()
  @Length(3, 30)
  firstName!: string;

  @ApiProperty()
  @Expose()
  @Length(3, 30)
  lastName!: string;
}
