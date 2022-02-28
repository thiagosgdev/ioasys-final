import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDTO {
  user_id: string;

  @IsNotEmpty()
  products: ProductOrderDTO[];

  @IsNumber()
  @IsNotEmpty()
  quantity_items: number;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  order_price: number;

  @IsNumber()
  @IsNotEmpty()
  total_paid: number;
}

type ProductOrderDTO = {
  product_id: string;
  quantity: number;
};
