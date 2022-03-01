import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ShipmentStatus } from '../../enums/shipmentStatus.enum';

export class UpdateShipmentDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  order_id?: string;

  @IsString()
  @IsOptional()
  address_id?: string;

  @IsString()
  @IsOptional()
  user_id?;

  @IsString()
  @IsOptional()
  status?: ShipmentStatus;

  @IsOptional()
  deadline?: Date;
}
