import { Injectable, Inject } from '@nestjs/common';
import { Address } from 'src/shared/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAddressesByUserService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
  ) {}

  async find(id: string): Promise<Address[]> {
    const addresses = await this.addressRepository.find({ id });

    return addresses;
  }
}
