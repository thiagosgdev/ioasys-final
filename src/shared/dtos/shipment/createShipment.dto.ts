import { IsNotEmpty, IsString } from 'class-validator';
import { ShipmentStatus } from '../../enums/shipmentStatus.enum';

export class CreateShipmentDTO {
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsString()
  @IsNotEmpty()
  address_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  status: ShipmentStatus;

  @IsNotEmpty()
  deadline: Date;
}
