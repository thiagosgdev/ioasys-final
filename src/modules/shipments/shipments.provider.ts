import { Shipment } from 'src/shared/entities/shipment.entity';
import { Connection } from 'typeorm';

export const shipmentProviders = [
  {
    provide: 'SHIPMENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Shipment),
    inject: ['DATABASE_CONNECTION'],
  },
];
