import { Injectable, Inject } from '@nestjs/common';
import { Shipment } from 'src/shared/entities/shipment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListShipmentService {
  constructor(
    @Inject('SHIPMENT_REPOSITORY')
    private shipmentRepository: Repository<Shipment>,
  ) {}

  async list(): Promise<Shipment[]> {
    const shipments = this.shipmentRepository.query('SELECT * FROM shipment');

    return shipments;
  }
}
