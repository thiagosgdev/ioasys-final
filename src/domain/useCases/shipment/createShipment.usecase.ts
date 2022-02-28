import { CreateShipmentDTO } from 'src/shared/dtos/shipment/createShipment.dto';
import { Shipment } from 'src/shared/entities/shipment.entity';

export interface CreateShipment {
  create(data: CreateShipmentDTO): Promise<Shipment>;
}
