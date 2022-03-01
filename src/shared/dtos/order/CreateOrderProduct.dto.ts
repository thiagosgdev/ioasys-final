import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderProductDTO {
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
