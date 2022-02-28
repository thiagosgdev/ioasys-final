import { UpdateAddressDTO } from 'src/shared/dtos/address/updateAddress.dto';
import { Address } from 'src/shared/entities/address.entity';

export interface UpdateAddress {
  update(data: UpdateAddressDTO): Promise<Address>;
}
