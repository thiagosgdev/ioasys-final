import { Injectable, Inject } from '@nestjs/common';
import { UpdateAddressDTO } from 'src/shared/dto/updateAddress.dto';
import { Address } from 'src/shared/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateAddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
  ) {}

  async update(data: UpdateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.query(
      `SELECT * FROM address WHERE id= $1`,
      [data.id],
    );
    return await this.addressRepository.save({
      ...address,
      ...data,
    });
  }
}
