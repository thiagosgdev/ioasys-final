import { Injectable } from '@nestjs/common';
import { AddressRepo } from 'src/shared/repositories/address.repository';

@Injectable()
export class DeleteAddressService {
  constructor(private addressRepository: AddressRepo) {}

  async delete(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
