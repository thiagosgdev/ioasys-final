import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Product } from './product.entity';
import { Stock } from './stock.entity';

@Entity('suppliers')
export class Supplier {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  company_registration: string;

  @Column()
  phone: number;

  @Column()
  website: string;

  @Column()
  email: string;

  @Column()
  representative_name: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

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
