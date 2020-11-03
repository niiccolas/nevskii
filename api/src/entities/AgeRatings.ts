import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Products from './Products';

@Index('pk_age_ratings', ['idAgeRating'], { unique: true })
@Entity('age_ratings', { schema: 'public' })
export default class AgeRatings {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_age_rating' })
  idAgeRating!: number;

  @Column('character varying', { name: 'name', length: 255 })
  name!: string;

  @OneToMany(() => Products, products => products.idAgeRating)
  products!: Products[];
}
