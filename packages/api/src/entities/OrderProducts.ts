import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Orders from './Orders';
import Products from './Products';

@Index('pk_order_products', ['idOrderProducts'], { unique: true })
@Entity('order_products', { schema: 'public' })
export default class OrderProducts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_order_products' })
  idOrderProducts!: number;

  @Column('integer', { name: 'quantity' })
  quantity!: number;

  @ManyToOne(() => Orders, orders => orders.orderProducts)
  @JoinColumn([{ name: 'id_orp_order', referencedColumnName: 'idOrder' }])
  idOrpOrder!: Orders;

  @ManyToOne(() => Products, products => products.orderProducts)
  @JoinColumn([{ name: 'id_orp_product', referencedColumnName: 'idProduct' }])
  idOrpProduct!: Products;
}
