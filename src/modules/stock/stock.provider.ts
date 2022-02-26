import { Stock } from 'src/shared/entities/stock.entity';
import { Connection } from 'typeorm';

export const stockProviders = [
  {
    provide: 'STOCK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Stock),
    inject: ['DATABASE_CONNECTION'],
  },
];
