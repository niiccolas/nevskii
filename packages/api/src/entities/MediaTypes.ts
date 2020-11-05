import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Products from './Products';

@Index('pk_media_types', ['idMediaType'], { unique: true })
@Entity('media_types', { schema: 'public' })
export default class MediaTypes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_media_type' })
  idMediaType!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => Products, products => products.idMediaType)
  products!: Products[];
}
