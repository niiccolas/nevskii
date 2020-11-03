import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Orders from './Orders';
import Countries from './Countries';
import UserTypes from './UserTypes';

@Index('uc_users_email', ['email'], { unique: true })
@Index('pk_users', ['idUser'], { unique: true })
@Entity('users', { schema: 'public' })
export default class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_user' })
  idUser!: number;

  @Column('character varying', { name: 'first_name' })
  firstName!: string;

  @Column('character varying', { name: 'last_name' })
  lastName!: string;

  @Column('character varying', { name: 'email', unique: true })
  email!: string;

  @Column('character', { name: 'gender', nullable: true, length: 1 })
  gender: string | null = '';

  @Column('character varying', { name: 'address', nullable: true })
  address: string | null = '';

  @Column('character varying', { name: 'city' })
  city!: string;

  @Column('character varying', { name: 'zip_code' })
  zipCode!: string;

  @Column('character varying', { name: 'state', nullable: true })
  state: string | null = '';

  @Column('date', { name: 'date_of_birth', nullable: true })
  dateOfBirth: string | null = '';

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => Orders, orders => orders.idUser)
  orders!: Orders[];

  @ManyToOne(() => Countries, countries => countries.users)
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'idCountry' }])
  idCountry!: Countries;

  @ManyToOne(() => UserTypes, userTypes => userTypes.users)
  @JoinColumn([{ name: 'id_user_type', referencedColumnName: 'idUserType' }])
  idUserType!: UserTypes;
}
