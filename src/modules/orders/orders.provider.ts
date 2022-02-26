import { Order } from 'src/shared/entities/order.entity';
import { Connection } from 'typeorm';

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: ['DATABASE_CONNECTION'],
  },
];
