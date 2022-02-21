import { Product } from 'src/shared/entities/product.entity';
import { Connection } from 'typeorm';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Product),
    inject: ['DATABASE_CONNECTION'],
  },
];
