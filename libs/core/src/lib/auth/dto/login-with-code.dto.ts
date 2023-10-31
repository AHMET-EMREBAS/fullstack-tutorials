import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@Exclude()
export class LoginWithCodeDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  username!: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @MaxLength(200)
  code!: string;
}
