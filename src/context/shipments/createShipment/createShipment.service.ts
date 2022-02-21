import { Injectable, Inject } from '@nestjs/common';
import { CreateShipmentDTO } from 'src/shared/dto/createShipment.dto';
import { Shipment } from 'src/shared/entities/shipment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateShipmentService {
  constructor(
    @Inject('SHIPMENT_REPOSITORY')
    private shipmentRepository: Repository<Shipment>,
  ) {}

  async create(data: CreateShipmentDTO): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(data);
    await this.shipmentRepository.save(shipment);

    return shipment;
  }
}
