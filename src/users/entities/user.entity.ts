import { Delete } from '@nestjs/common';
import {
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ default: 'user' })
  rol: string;
  @DeleteDateColumn()
  deletedAt: Date | null;
}
