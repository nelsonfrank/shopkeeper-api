import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Store } from '@/store/entities/store.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @OneToMany(() => Store, (store) => store.storeOwner)
  stores: Store[];

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
