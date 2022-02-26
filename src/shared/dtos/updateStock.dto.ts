import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateStockDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  product_id?: string;

  @IsString()
  supplier_id?: string;

  @IsNumber()
  low_amount?: number;

  @IsString()
  unit_type?: string;

  @IsNumber()
  amount?: number;
}
