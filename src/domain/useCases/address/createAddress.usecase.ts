import { CreateAddressDTO } from 'src/shared/dtos/address/createAddress.dto';
import { Address } from 'src/shared/entities/address.entity';

export interface CreateAddress {
  create(data: CreateAddressDTO): Promise<Address>;
}
