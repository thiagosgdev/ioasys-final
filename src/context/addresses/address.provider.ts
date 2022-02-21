import { Address } from 'src/shared/entities/address.entity';
import { Connection } from 'typeorm';

export const addressProviders = [
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Address),
    inject: ['DATABASE_CONNECTION'],
  },
];
