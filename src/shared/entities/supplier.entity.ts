import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

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
