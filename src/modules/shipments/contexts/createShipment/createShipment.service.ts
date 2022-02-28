import { Injectable } from '@nestjs/common';
import { CreateShipmentDTO } from 'src/shared/dtos/shipment/createShipment.dto';
import { Shipment } from 'src/shared/entities/shipment.entity';
import { ShipmentRepo } from '../../repository/shipment.repository';

@Injectable()
export class CreateShipmentService {
  constructor(private shipmentRepository: ShipmentRepo) {}

  async create(data: CreateShipmentDTO): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(data);
    return shipment;
  }
}
