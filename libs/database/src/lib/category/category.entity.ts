import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name!: string;
}
