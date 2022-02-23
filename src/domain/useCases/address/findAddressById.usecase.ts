import { Address } from 'src/shared/entities/address.entity';

export interface FindAddressById {
  findById(id: string): Promise<Address>;
}
