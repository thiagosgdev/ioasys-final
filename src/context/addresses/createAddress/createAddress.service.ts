import { Injectable } from '@nestjs/common';
import { CreateAddressDTO } from 'src/shared/dtos/createAddress.dto';
import { Address } from 'src/shared/entities/address.entity';
import { AddressRepo } from 'src/shared/repositories/address.repository';

@Injectable()
export class CreateAddressService {
  constructor(private readonly addressRepository: AddressRepo) {}

  async create(data: CreateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.create(data);
    return address;
  }
}
