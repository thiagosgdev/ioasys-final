import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentStatus } from 'src/shared/enums/paymentStatus.enum';

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

  @IsString()
  @IsNotEmpty()
  payment_status: PaymentStatus;
}

type ProductOrderDTO = {
  product_id: string;
  quantity: number;
};
