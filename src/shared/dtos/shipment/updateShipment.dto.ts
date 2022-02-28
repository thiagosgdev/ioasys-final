import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ShipmentStatus } from '../../enums/shipmentStatus.enum';

export class UpdateShipmentDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  order_id?: string;

  @IsString()
  address_id?: string;

  @IsString()
  status?: ShipmentStatus;

  @IsDate()
  deadline?: Date;
}
