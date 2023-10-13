import { IBaseModel } from '@techbir/common';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Common fields of the database tables.
 */
export class BaseModel implements IBaseModel {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
}
