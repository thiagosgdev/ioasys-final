import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateAddressDTO } from 'src/shared/dto/createAddress.dto';
import { CreateAddressService } from './createAddress.service';

@Controller('address')
export class CreateAddressController {
  constructor(private createAddressService: CreateAddressService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateAddressDTO) {
    const address = await this.createAddressService.create(data);
    return instanceToInstance(address);
  }
}
