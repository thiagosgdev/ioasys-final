import { UpdateAddressDTO } from 'src/shared/dtos/updateAddress.dto';
import { Address } from 'src/shared/entities/address.entity';

export interface UpdateAddress {
  update(data: UpdateAddressDTO): Promise<Address>;
}
