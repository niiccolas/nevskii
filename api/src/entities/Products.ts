import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderProducts from './OrderProducts';
import ProductAuthors from './ProductAuthors';
import ProductCountries from './ProductCountries';
import AgeRatings from './AgeRatings';
import Availabilities from './Availabilities';
import Distributors from './Distributors';
import MediaTypes from './MediaTypes';
import Publishers from './Publishers';
import StockStatuses from './StockStatuses';
import Videos from './Videos';

@Index('pk_products', ['idProduct'], { unique: true })
@Entity('products', { schema: 'public' })
export default class Products {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_product' })
  idProduct!: number;

  @Column('character varying', { name: 'title', length: 255 })
  title!: string;

  @Column('character varying', { name: 'title_original', length: 255 })
  titleOriginal!: string;

  @Column('bigint', { name: 'price', nullable: true })
  price?: number;

  @Column('text', { name: 'synopsis', nullable: true })
  synopsis?: string;

  @Column('smallint', { name: 'production_year', nullable: true })
  productionYear?: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt!: Date;

  @Column('bigint', { name: 'ean', nullable: true })
  ean?: string;

  @Column('character varying', { name: 'image_url', nullable: true })
  imageUrl?: string;

  @Column('integer', { name: 'id_vinyl', nullable: true, select: false })
  idVinyl?: number;

  @OneToMany(() => OrderProducts, orderProducts => orderProducts.idOrpProduct)
  orderProducts!: OrderProducts[];

  @OneToMany(
    () => ProductAuthors,
    productAuthors => productAuthors.idPauProduct,
  )
  productAuthors!: ProductAuthors[];

  @OneToMany(
    () => ProductCountries,
    productCountries => productCountries.idPcoProduct,
  )
  productCountries!: ProductCountries[];

  @ManyToOne(() => AgeRatings, ageRatings => ageRatings.products)
  @JoinColumn([{ name: 'id_age_rating', referencedColumnName: 'idAgeRating' }])
  idAgeRating?: AgeRatings;

  @ManyToOne(() => Availabilities, availabilities => availabilities.products)
  @JoinColumn([
    { name: 'id_availability', referencedColumnName: 'idAvailability' },
  ])
  idAvailability?: Availabilities;

  @ManyToOne(() => Distributors, distributors => distributors.products)
  @JoinColumn([
    { name: 'id_distributor', referencedColumnName: 'idDistributor' },
  ])
  idDistributor?: Distributors;

  @ManyToOne(() => MediaTypes, mediaTypes => mediaTypes.products, {
    eager: true,
  })
  @JoinColumn([{ name: 'id_media_type', referencedColumnName: 'idMediaType' }])
  idMediaType?: MediaTypes;

  @ManyToOne(() => Publishers, publishers => publishers.products)
  @JoinColumn([{ name: 'id_publisher', referencedColumnName: 'idPublisher' }])
  idPublisher?: Publishers;

  @ManyToOne(() => StockStatuses, stockStatuses => stockStatuses.products)
  @JoinColumn([
    { name: 'id_stock_status', referencedColumnName: 'idStockStatus' },
  ])
  idStockStatus!: StockStatuses;

  @ManyToOne(() => Videos, videos => videos.products)
  @JoinColumn([{ name: 'id_video', referencedColumnName: 'idVideo' }])
  idVideo!: Videos;
}
