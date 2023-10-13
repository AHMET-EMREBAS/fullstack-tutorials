import { Exclude, Expose } from 'class-transformer';
import { IBaseModel } from '../common';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { TrimTransformer } from '../transformer';

export interface IUser extends IBaseModel {
  username: string;
  password: string;
}

@Exclude()
export class UserDto implements IUser {
  @Exclude() id!: number;
  @Exclude() createdAt!: Date;
  @Exclude() updatedAt!: Date;
  @Exclude() deletedAt!: Date;

  @Expose()
  @IsEmail()
  @TrimTransformer()
  username!: string;

  @Expose()
  @IsStrongPassword()
  @TrimTransformer()
  password!: string;
}
