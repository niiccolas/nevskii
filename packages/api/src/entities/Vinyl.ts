import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'vynil' })
export default class Vinyl {
  @PrimaryGeneratedColumn()
  id = 0;

  @Index({ unique: true })
  @Column('varchar', { length: 500, nullable: true })
  email: string | null = null;

  @Column('varchar', { length: 1000, nullable: true })
  password = '';

  @Column('varchar', { length: 50 })
  firstName = '';

  @Column('varchar', { length: 50 })
  lastName = '';

  @Column('varchar', { length: 15000, nullable: true })
  photo = '';

  @Column('varchar', { length: 100, nullable: true })
  phone = '';

  @Column('text', { nullable: true })
  about = '';

  @Column({ type: 'timestamptz', default: 'now()' })
  createdAt: Date = new Date();

  @Column({ type: 'timestamptz' })
  updatedAt: Date = new Date();
}
