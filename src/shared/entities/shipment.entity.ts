import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { ShipmentStatus } from '../enums/shipmentStatus.enum';

@Entity('shipments')
export class Shipment {
  @PrimaryColumn()
  id: string;

  @Column()
  order_id: string;

  @Column()
  address_id: string;

  @Column()
  status: ShipmentStatus;

  @Column()
  deadline: Date;

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
