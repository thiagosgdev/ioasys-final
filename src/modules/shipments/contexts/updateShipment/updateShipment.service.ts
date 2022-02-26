import { Injectable } from '@nestjs/common';
import { UpdateShipmentDTO } from 'src/shared/dtos/updateShipment.dto';
import { Shipment } from 'src/shared/entities/shipment.entity';
import { ShipmentRepo } from '../../repository/shipment.repository';

@Injectable()
export class UpdateShipmentService {
  constructor(private shipmentRepository: ShipmentRepo) {}

  async update(data: UpdateShipmentDTO): Promise<Shipment> {
    const shipment = await this.shipmentRepository.update(data);
    return shipment;
  }
}
