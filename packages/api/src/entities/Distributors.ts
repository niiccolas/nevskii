import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Products from './Products';

@Index('pk_distributors', ['idDistributor'], { unique: true })
@Entity('distributors', { schema: 'public' })
export default class Distributors {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_distributor' })
  idDistributor!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => Products, products => products.idDistributor)
  products!: Products[];
}
