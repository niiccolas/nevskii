import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Products from './Products';

@Index('pk_stock_statuses', ['idStockStatus'], { unique: true })
@Entity('stock_statuses', { schema: 'public' })
export default class StockStatuses {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_stock_status' })
  idStockStatus!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => Products, products => products.idStockStatus)
  products!: Products[];
}
