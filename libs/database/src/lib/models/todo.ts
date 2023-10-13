import { ITodo } from '@techbir/common';
import { BaseModel } from '../common';
import { Column, Entity } from 'typeorm';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { MinLength, MaxLength, IsOptional } from 'class-validator';
/**
 * This class is for introducing a table defination named Todo to our database.
 * We also use it as Data transfer object.
 */

@Entity()
export class Todo extends BaseModel implements ITodo {
  @Column({ type: 'varchar', unique: true, default: '' })
  title = '';

  @Column({ type: 'varchar', default: '' })
  description = '';

  @Column({ type: 'varchar', default: 'todo' })
  status = 'todo';
}

@Exclude()
export class CreateTodoDto {
  @ApiProperty({
    type: 'string',
    default: 'First task',
    minLength: 3,
    maxLength: 50,
    description: 'Unqiue Todo title.',
  })
  @Expose()
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  title = '';

  @ApiProperty({
    type: 'string',
    default: 'Desribe your task',
    maxLength: 400,
    description: 'Todo description should be less than 400 characters',
  })
  @Expose()
  @MinLength(3)
  @MaxLength(400)
  @IsOptional()
  description = '';

  @ApiProperty({
    type: 'string',
    default: 'todo',
    maxLength: 30,
    description:
      'Todo status. It cann be any string value from 3 to 30 characters',
  })
  @Expose()
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  status = 'todo';
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
