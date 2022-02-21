import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { stockProviders } from '../stock/stock.provider';
import { CreateOrderController } from './createOrder/createOrder.controller';
import { CreateOrderService } from './createOrder/createOrder.service';
import { orderProviders } from './orders.provider';
import { orderProductProviders } from './orders_products.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderProviders,
    ...orderProductProviders,
    ...stockProviders,
    CreateOrderService,
  ],
  controllers: [CreateOrderController],
})
export class OrderModule {}
