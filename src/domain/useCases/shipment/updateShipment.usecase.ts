import { UpdateShipmentDTO } from 'src/shared/dtos/updateShipment.dto';
import { Shipment } from 'src/shared/entities/shipment.entity';

export interface UpdateShipment {
  update(data: UpdateShipmentDTO): Promise<Shipment>;
}
