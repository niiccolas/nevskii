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
import Users from './Users';

@Index('pk_orders', ['idOrder'], { unique: true })
@Entity('orders', { schema: 'public' })
export default class Orders {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_order' })
  idOrder!: number;

  @Column('character varying', { name: 'status', length: 100 })
  status!: string;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => OrderProducts, orderProducts => orderProducts.idOrpOrder)
  orderProducts!: OrderProducts[];

  @ManyToOne(() => Users, users => users.orders)
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'idUser' }])
  idUser!: Users;
}
