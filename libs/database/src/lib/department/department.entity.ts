import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@techbir/core';

@Entity()
export class Department extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name!: string;
}
