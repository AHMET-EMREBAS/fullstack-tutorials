import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../base';
import { hashSync, genSaltSync } from 'bcrypt';
import { Role } from '../role';
import { v4 } from 'uuid';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' }) firstName?: string;
  @Column({ type: 'varchar' }) lastName?: string;

  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({
    type: 'varchar',
    transformer: {
      from: (value) => value,
      to: (value) => value && hashSync(value, genSaltSync(8)),
    },
  })
  password!: string;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: {
      from: (value) => value,
      to: (value) => v4(),
    },
  })
  uuid!: string;

  @Column({ type: 'boolean', default: false })
  isAdmin?: boolean;

  @ManyToMany(() => Role, (r) => r.id, { eager: true, nullable: true })
  @JoinTable()
  roles!: Role[];
}
