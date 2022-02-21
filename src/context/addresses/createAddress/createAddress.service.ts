import { Injectable, Inject } from '@nestjs/common';
import { CreateAddressDTO } from 'src/shared/dto/createAddress.dto';
import { Address } from 'src/shared/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateAddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
  ) {}

  async create(data: CreateAddressDTO): Promise<Address> {
    const address = this.addressRepository.create(data);
    await this.addressRepository.save(address);

    return address;
  }
}
