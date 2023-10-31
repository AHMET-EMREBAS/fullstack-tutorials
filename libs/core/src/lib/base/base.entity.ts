import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn() id?: number;
  @CreateDateColumn() createdAt?: Date;
  @UpdateDateColumn() updatedAt?: Date;
  @DeleteDateColumn() deletedAt?: Date;
  @Column({ type: 'boolean', default: true }) active?: boolean;
}
