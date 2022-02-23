import { Shipment } from 'src/shared/entities/shipment.entity';

export interface ListShipments {
  list(): Promise<Shipment[]>;
}
