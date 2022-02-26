import { Injectable } from '@nestjs/common';
import { Address } from 'src/shared/entities/address.entity';
import { AddressRepo } from 'src/modules/addresses/repository/address.repository';

@Injectable()
export class FindAddressesByIdService {
  constructor(private addressRepository: AddressRepo) {}

  async find(id: string): Promise<Address> {
    const addresses = await this.addressRepository.findById(id);
    return addresses;
  }
}
