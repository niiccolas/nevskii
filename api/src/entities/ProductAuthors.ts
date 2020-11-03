import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Authors from './Authors';
import Products from './Products';

@Index('pk_product_authors', ['idProductAuthors'], { unique: true })
@Entity('product_authors', { schema: 'public' })
export default class ProductAuthors {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_product_authors' })
  idProductAuthors!: number;

  @ManyToOne(() => Authors, authors => authors.productAuthors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_pau_author', referencedColumnName: 'idAuthor' }])
  idPauAuthor!: Authors;

  @ManyToOne(() => Products, products => products.productAuthors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_pau_product', referencedColumnName: 'idProduct' }])
  idPauProduct!: Products;
}
