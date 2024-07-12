import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  storeName: string;

  @Column({ nullable: true })
  storeAddress: string;

  @OneToOne(() => User)
  @JoinColumn()
  @Column({ nullable: false })
  storeOwner: User;

  @Column({ default: true })
  isActive: boolean;
}
