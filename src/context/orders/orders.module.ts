import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { Order } from 'src/shared/entities/order.entity';
import { OrderProduct } from 'src/shared/entities/order_product.entity';
import { Stock } from 'src/shared/entities/stock.entity';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { EnsureUserLoggedMiddleware } from 'src/shared/middleware/ensureLogged.middleware';
import { OrderRepo } from 'src/shared/repositories/order.repository';
import { OrderProductRepo } from 'src/shared/repositories/orderProduct.repository';
import { StockRepo } from 'src/shared/repositories/stock.repository';
import { stockProviders } from '../stock/stock.provider';
import { CreateOrderController } from './createOrder/createOrder.controller';
import { CreateOrderService } from './createOrder/createOrder.service';
import { ListOrdersService } from './listOrders/listOrders.service';
import { ListOrdersController } from './listOrders/listOrders.controller';
import { orderProviders } from './orders.provider';
import { orderProductProviders } from './orders_products.provider';
import { DeleteOrderService } from './deleteOrder/deleteOrder.service';
import { DeleteOrderController } from './deleteOrder/deleteOrder.controller';
import { FindOrderByIdService } from './findOrderById/findOrderById.service';
import { FindOrderByIdController } from './findOrderById/findOrderById.controller';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/shared/repositories/user.repository';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Order, OrderProduct, Stock, User]),
  ],
  providers: [
    ...orderProviders,
    ...orderProductProviders,
    ...stockProviders,
    UserRepo,
    OrderRepo,
    OrderProductRepo,
    StockRepo,
    CreateOrderService,
    ListOrdersService,
    DeleteOrderService,
    FindOrderByIdService,
  ],
  controllers: [
    CreateOrderController,
    ListOrdersController,
    DeleteOrderController,
    FindOrderByIdController,
  ],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureUserLoggedMiddleware)
      .forRoutes(CreateOrderController, FindOrderByIdController);
    consumer
      .apply(EnsureAdminMiddleware)
      .forRoutes(DeleteOrderController, ListOrdersController);
  }
}
