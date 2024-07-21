import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@/users/entities/user.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  storeName: string;

  @Column({ nullable: true })
  storeAddress: string;

  @ManyToOne(() => User, (user) => user.stores, { nullable: false })
  storeOwner: User;

  @Column({ default: true })
  isActive: boolean;
}
