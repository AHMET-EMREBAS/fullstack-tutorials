import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../common';
import { hashSync, genSaltSync } from 'bcrypt';
import { Role } from '../role';
import { v4 } from 'uuid';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
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

  @ManyToMany(() => Role, (r) => r.id, { eager: true, nullable: true })
  @JoinTable()
  roles!: Role[];
}
