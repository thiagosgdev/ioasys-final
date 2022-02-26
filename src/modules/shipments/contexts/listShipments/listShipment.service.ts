import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Shipment } from 'src/shared/entities/shipment.entity';
import { ShipmentRepo } from '../../repository/shipment.repository';

@Injectable()
export class ListShipmentService {
  constructor(private shipmentRepository: ShipmentRepo) {}

  async list(): Promise<Shipment[]> {
    const shipments = await this.shipmentRepository.list();
    if (shipments.length < 0) {
      throw new HttpException('Not shipment Found!', HttpStatus.NOT_FOUND);
    }
    return shipments;
  }
}
