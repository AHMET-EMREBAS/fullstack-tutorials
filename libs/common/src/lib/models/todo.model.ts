import { IBaseModel } from '../common';

import { Expose, Exclude } from 'class-transformer';
import { MinLength, MaxLength, IsOptional, IsIn } from 'class-validator';
import { TrimTransformer } from '../transformer';

export interface ITodo extends IBaseModel {
  title: string;
  description: string;
  status: string;
}

@Exclude()
export class TodoDto implements ITodo {
  @Exclude() id!: number;
  @Exclude() createdAt!: Date;
  @Exclude() updatedAt!: Date;
  @Exclude() deletedAt!: Date;

  @Expose()
  @IsOptional({ groups: ['UPDATE'] })
  @MinLength(3)
  @MaxLength(30)
  @TrimTransformer()
  title!: string;

  @Expose()
  @IsOptional()
  @MaxLength(400)
  @TrimTransformer()
  description!: string;

  @Expose()
  @IsOptional()
  @IsIn(['todo', 'inprogress', 'done'])
  @MinLength(3)
  @MaxLength(30)
  status!: string;
}
