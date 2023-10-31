import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base';

@Entity()
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name!: string;
}
