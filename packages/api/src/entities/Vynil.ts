import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('IDX_a2b82b014656589c8609f86da5', ['email'], { unique: true })
@Entity('vynil', { schema: 'public' })
export default class Vynil {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'email', nullable: true, length: 500 })
  email: string | null = null;

  @Column('character varying', {
    name: 'password',
    nullable: true,
    length: 1000,
  })
  password: string | null = '';

  @Column('character varying', { name: 'firstName', length: 50 })
  firstName?: string;

  @Column('character varying', { name: 'lastName', length: 50 })
  lastName?: string;

  @Column('character varying', { name: 'photo', nullable: true, length: 15000 })
  photo?: string | null;

  @Column('character varying', { name: 'phone', nullable: true, length: 100 })
  phone?: string | null;

  @Column('text', { name: 'about', nullable: true })
  about?: string | null;

  @Column('timestamp with time zone', {
    name: 'createdAt',
    default: () => "'2020-10-29 23:16:08.785455+00'",
  })
  createdAt: Date = new Date();

  @Column('timestamp with time zone', { name: 'updatedAt' })
  updatedAt: Date = new Date();
}
