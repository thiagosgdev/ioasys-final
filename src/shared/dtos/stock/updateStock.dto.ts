import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStockDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  product_id?: string;

  @IsOptional()
  @IsNumber()
  low_amount?: number;

  @IsOptional()
  @IsString()
  unit_type?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;
}
