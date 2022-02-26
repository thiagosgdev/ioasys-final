import { OrderProduct } from 'src/shared/entities/order_product.entity';
import { Connection } from 'typeorm';

export const orderProductProviders = [
  {
    provide: 'ORDER_PRODUCT_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(OrderProduct),
    inject: ['DATABASE_CONNECTION'],
  },
];
