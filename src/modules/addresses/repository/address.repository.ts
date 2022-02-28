import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddress } from 'src/domain/useCases/address/createAddress.usecase';
import { DeleteAddress } from 'src/domain/useCases/address/deleteAddress.usecase';
import { FindAddressById } from 'src/domain/useCases/address/findAddressById.usecase';
import { ListAddresses } from 'src/domain/useCases/address/listAddresses.usecase';
import { UpdateAddress } from 'src/domain/useCases/address/updateAddress.usecase';
import { Repository } from 'typeorm';
import { CreateAddressDTO } from '../../../shared/dtos/address/createAddress.dto';
import { UpdateAddressDTO } from '../../../shared/dtos/address/updateAddress.dto';
import { Address } from '../../../shared/entities/address.entity';

@Injectable()
export class AddressRepo
  implements
    CreateAddress,
    FindAddressById,
    DeleteAddress,
    ListAddresses,
    UpdateAddress
{
  constructor(
    @InjectRepository(Address)
    private readonly repository: Repository<Address>,
  ) {}

  async create(data: CreateAddressDTO): Promise<Address> {
    const address = this.repository.create(data);
    await this.repository.save(address);
    return address;
  }
  async findById(id: string): Promise<Address> {
    const address = await this.repository.findOne(id);
    return address;
  }
  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
  async list(): Promise<Address[]> {
    const addresses = await this.repository.find();
    return addresses;
  }
  async update(data: UpdateAddressDTO): Promise<Address> {
    const address = await this.repository.findOne({ id: data.id });
    return await this.repository.save({
      ...address,
      ...data,
    });
  }
}
