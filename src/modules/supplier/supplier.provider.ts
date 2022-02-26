import { Supplier } from 'src/shared/entities/supplier.entity';
import { Connection } from 'typeorm';

export const supplierProviders = [
  {
    provide: 'SUPPLIER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Supplier),
    inject: ['DATABASE_CONNECTION'],
  },
];
