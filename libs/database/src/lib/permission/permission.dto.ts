import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
@Exclude()
export class PermissionDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 30)
  name!: string;
}

@Exclude()
export class UpdatePermissionDto extends PartialType(PermissionDto) {}
