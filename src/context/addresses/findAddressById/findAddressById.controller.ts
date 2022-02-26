import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { FindAddressesByIdService } from './findAddressById.service';

@Controller('addresses')
export class FindAddressesByUserController {
  constructor(private findAddressesByIdService: FindAddressesByIdService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string) {
    const address = await this.findAddressesByIdService.find(id);
    return instanceToInstance(address);
  }
}
