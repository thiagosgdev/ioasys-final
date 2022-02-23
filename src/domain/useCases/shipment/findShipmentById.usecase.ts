import { Shipment } from 'src/shared/entities/shipment.entity';

export interface FindShipmentById {
  findById(id: string): Promise<Shipment>;
}
