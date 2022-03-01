import { Injectable } from '@nestjs/common';
import { Shipment } from 'src/shared/entities/shipment.entity';
import { ShipmentRepo } from '../../repository/shipment.repository';

@Injectable()
export class FindShipmentByIdService {
  constructor(private shipmentRepository: ShipmentRepo) {}

  async find(id: string): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findById(id);
    if (!shipment) {
      return null;
    }
    return shipment;
  }
}
