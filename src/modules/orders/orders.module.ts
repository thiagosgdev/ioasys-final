import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { Order } from 'src/shared/entities/order.entity';
import { OrderProduct } from 'src/shared/entities/order_product.entity';
import { Stock } from 'src/shared/entities/stock.entity';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { EnsureUserLoggedMiddleware } from 'src/shared/middleware/ensureLogged.middleware';
import { OrderRepo } from 'src/modules/orders/repository/order.repository';
import { StockRepo } from 'src/modules/stock/repository/stock.repository';
import { stockProviders } from '../stock/stock.provider';
import { CreateOrderController } from './contexts/createOrder/createOrder.controller';
import { CreateOrderService } from './contexts/createOrder/createOrder.service';
import { ListOrdersService } from './contexts/listOrders/listOrders.service';
import { ListOrdersController } from './contexts/listOrders/listOrders.controller';
import { orderProviders } from './orders.provider';
import { orderProductProviders } from './orders_products.provider';
import { DeleteOrderService } from './contexts/deleteOrder/deleteOrder.service';
import { DeleteOrderController } from './contexts/deleteOrder/deleteOrder.controller';
import { FindOrderByIdService } from './contexts/findOrderById/findOrderById.service';
import { FindOrderByIdController } from './contexts/findOrderById/findOrderById.controller';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/shared/repositories/user.repository';
import { OrderProductRepo } from './repository/orderProduct.repository';

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
