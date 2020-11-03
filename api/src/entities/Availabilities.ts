import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Products from './Products';

@Index('pk_availabilities', ['idAvailability'], { unique: true })
@Entity('availabilities', { schema: 'public' })
export default class Availabilities {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_availability' })
  idAvailability!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => Products, products => products.idAvailability)
  products!: Products[];
}
