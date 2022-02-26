import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Product } from './product.entity';
import { Supplier } from './supplier.entity';

@Entity('stocks')
export class Stock {
  @PrimaryColumn()
  id: string;

  @Column()
  product_id: string;

  @Column()
  supplier_id: string;

  @Column()
  low_amount: number;

  @Column()
  unit_type: string;

  @Column()
  amount: number;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'id' })
  supplier: Supplier;

  @OneToOne(() => Product, (product) => product.stock)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

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
