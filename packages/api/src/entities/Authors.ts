import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductAuthors from './ProductAuthors';

@Index('pk_authors', ['idAuthor'], { unique: true })
@Entity('authors', { schema: 'public' })
export default class Authors {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_author' })
  idAuthor!: number;

  @Column('character varying', { name: 'name', length: 255 })
  name!: string;

  @Column('character varying', { name: 'image_url', nullable: true })
  imageUrl: string | null = '';

  @OneToMany(() => ProductAuthors, productAuthors => productAuthors.idPauAuthor)
  productAuthors!: ProductAuthors[];
}
