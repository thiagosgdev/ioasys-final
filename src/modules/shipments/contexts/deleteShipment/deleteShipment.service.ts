import { Injectable } from '@nestjs/common';
import { Shipment } from 'src/shared/entities/shipment.entity';
import { ShipmentRepo } from '../../repository/shipment.repository';

@Injectable()
export class DeleteShipmentService {
  constructor(private shipmentRepository: ShipmentRepo) {}

  async delete(id: string): Promise<void> {
    await this.shipmentRepository.delete(id);
  }
}
