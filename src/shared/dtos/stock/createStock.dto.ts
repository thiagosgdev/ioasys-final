import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStockDTO {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  @IsNotEmpty()
  low_amount: number;

  @IsString()
  @IsNotEmpty()
  unit_type: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
