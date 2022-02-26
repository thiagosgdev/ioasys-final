import { InjectRepository } from '@nestjs/typeorm';
import { CreateShipment } from 'src/domain/useCases/shipment/createShipment.usecase';
import { FindShipmentById } from 'src/domain/useCases/shipment/findShipmentById.usecase';
import { ListShipments } from 'src/domain/useCases/shipment/listShipments.usecase';
import { UpdateShipment } from 'src/domain/useCases/shipment/updateShipment.usecase';
import { Repository } from 'typeorm';
import { CreateShipmentDTO } from '../../../shared/dtos/createShipment.dto';
import { UpdateShipmentDTO } from '../../../shared/dtos/updateShipment.dto';
import { Shipment } from '../../../shared/entities/shipment.entity';

export class ShipmentRepo
  implements CreateShipment, ListShipments, UpdateShipment, FindShipmentById
{
  constructor(
    @InjectRepository(Shipment)
    private readonly repository: Repository<Shipment>,
  ) {}

  async create(data: CreateShipmentDTO): Promise<Shipment> {
    const shipment = this.repository.create(data);
    await this.repository.save(shipment);

    return shipment;
  }

  async list(): Promise<Shipment[]> {
    const shipments = await this.repository.find();
    return shipments;
  }

  async update(data: UpdateShipmentDTO): Promise<Shipment> {
    const shipment = await this.repository.findOne({ id: data.id });

    const updateShipment = {
      ...shipment,
      ...data,
    };
    await this.repository.save(updateShipment);

    return updateShipment;
  }

  async findById(id: string): Promise<Shipment> {
    const shipment = await this.repository.findOne(id);
    return shipment;
  }
}
