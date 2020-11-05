import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Products from './Products';

@Index('pk_publishers', ['idPublisher'], { unique: true })
@Entity('publishers', { schema: 'public' })
export default class Publishers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_publisher' })
  idPublisher!: number;

  @Column('character varying', { name: 'name', length: 255 })
  name!: string;

  @Column('character varying', { name: 'website', nullable: true })
  website: string | null = '';

  @OneToMany(() => Products, products => products.idPublisher)
  products!: Products[];
}
