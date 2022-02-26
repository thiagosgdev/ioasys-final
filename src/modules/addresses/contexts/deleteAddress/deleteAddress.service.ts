import { Injectable } from '@nestjs/common';
import { AddressRepo } from 'src/modules/addresses/repository/address.repository';

@Injectable()
export class DeleteAddressService {
  constructor(private addressRepository: AddressRepo) {}

  async delete(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
