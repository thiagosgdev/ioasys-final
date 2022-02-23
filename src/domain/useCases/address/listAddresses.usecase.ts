import { Address } from 'src/shared/entities/address.entity';

export interface ListAddresses {
  list(): Promise<Address[]>;
}
