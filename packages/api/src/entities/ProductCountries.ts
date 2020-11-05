import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Countries from './Countries';
import Products from './Products';

@Index('pk_product_countries', ['idProductCountries'], { unique: true })
@Entity('product_countries', { schema: 'public' })
export default class ProductCountries {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_product_countries' })
  idProductCountries!: number;

  @ManyToOne(() => Countries, countries => countries.productCountries)
  @JoinColumn([{ name: 'id_pco_country', referencedColumnName: 'idCountry' }])
  idPcoCountry!: Countries;

  @ManyToOne(() => Products, products => products.productCountries)
  @JoinColumn([{ name: 'id_pco_product', referencedColumnName: 'idProduct' }])
  idPcoProduct!: Products;
}
