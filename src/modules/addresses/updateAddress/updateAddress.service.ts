import { Injectable } from '@nestjs/common';
import { UpdateAddressDTO } from 'src/shared/dtos/updateAddress.dto';
import { Address } from 'src/shared/entities/address.entity';
import { AddressRepo } from 'src/shared/repositories/address.repository';

@Injectable()
export class UpdateAddressService {
  constructor(private addressRepository: AddressRepo) {}

  async update(data: UpdateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.update(data);
    return address;
  }
}
