import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Users from './Users';

@Index('pk_user_types', ['idUserType'], { unique: true })
@Entity('user_types', { schema: 'public' })
export default class UserTypes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_user_type' })
  idUserType!: number; // ! USE ENUM HERE
  // ! USE ENUM HERE

  @Column('character varying', { name: 'description', length: 50 })
  description!: string;

  @OneToMany(() => Users, users => users.idUserType)
  users!: Users[];
}
