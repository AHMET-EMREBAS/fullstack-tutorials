import { PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class RoleDto {
  @ApiProperty()
  @Expose()
  @Length(3, 30)
  @IsNotEmpty()
  name!: string;
}

@Exclude()
export class UpdateRoleDto extends PartialType(RoleDto) {}