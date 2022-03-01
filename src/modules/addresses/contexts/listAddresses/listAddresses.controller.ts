import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { ListAddressesService } from './listAddresses.service';

@Controller('addresses/list')
export class ListAddressesController {
  constructor(private listAddressesService: ListAddressesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handle(@Res() res: Response) {
    const addresses = await this.listAddressesService.list();
    if (!addresses) {
      return res.status(404).send({ message: 'No data found!' });
    }
    return res.status(200).send(instanceToInstance(addresses));
  }
}
