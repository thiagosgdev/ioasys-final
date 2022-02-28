import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListAddressesService } from './listAddresses.service';

@Controller('addresses')
export class ListAddressesController {
  constructor(private listAddressesService: ListAddressesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handle() {
    const addresses = await this.listAddressesService.list();
    return instanceToInstance(addresses);
  }
}
