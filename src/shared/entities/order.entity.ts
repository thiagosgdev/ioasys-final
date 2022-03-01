import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { PaymentStatus } from '../enums/paymentStatus.enum';
import { OrderProduct } from './order_product.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  quantity_items: number;

  @Column()
  discount: number;

  @Column()
  order_price: number;

  @Column()
  total_paid: number;

  @Column()
  payment_status: PaymentStatus;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProduct: OrderProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
