import { Injectable } from '@nestjs/common';
import { CreateShipmentDTO } from 'src/shared/dtos/createShipment.dto';
import { Shipment } from 'src/shared/entities/shipment.entity';
import { ShipmentRepo } from 'src/shared/repositories/shipment.repository';

@Injectable()
export class CreateShipmentService {
  constructor(private shipmentRepository: ShipmentRepo) {}

  async create(data: CreateShipmentDTO): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(data);
    return shipment;
  }
}
