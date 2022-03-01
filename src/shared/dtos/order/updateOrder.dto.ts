import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentStatus } from 'src/shared/enums/paymentStatus.enum';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  user_id: string;

  @IsNumber()
  @IsOptional()
  quantity_items: number;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber()
  @IsOptional()
  order_price: number;

  @IsNumber()
  @IsOptional()
  total_paid: number;

  @IsString()
  @IsOptional()
  payment_status: PaymentStatus;
}
