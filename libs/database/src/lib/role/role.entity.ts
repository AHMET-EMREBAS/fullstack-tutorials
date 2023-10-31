import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../common';
import { Permission } from '../permission';

@Entity()
export class Role extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @ManyToMany(() => Permission, (p) => p.id, { eager: true, nullable: true })
  @JoinTable()
  permissions?: Permission[];
}
