import { Injectable } from '@nestjs/common';
import { Address } from 'src/shared/entities/address.entity';
import { AddressRepo } from 'src/modules/addresses/repository/address.repository';

@Injectable()
export class ListAddressesService {
  constructor(private addressRepository: AddressRepo) {}

  async list(): Promise<Address[]> {
    const addresses = await this.addressRepository.list();
    if (addresses.length < 1) {
      return null;
    }
    return addresses;
  }
}
