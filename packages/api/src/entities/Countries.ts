import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductCountries from './ProductCountries';
import Users from './Users';

@Index('pk_countries', ['idCountry'], { unique: true })
@Entity('countries', { schema: 'public' })
export default class Countries {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_country' })
  idCountry!: number;

  @Column('character varying', { name: 'name', length: 255 })
  name!: string;

  @OneToMany(
    () => ProductCountries,
    productCountries => productCountries.idPcoCountry,
  )
  productCountries!: ProductCountries[];

  @OneToMany(() => Users, users => users.idCountry)
  users!: Users[];
}
