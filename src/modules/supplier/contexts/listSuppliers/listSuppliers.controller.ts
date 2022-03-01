import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { ListSuppliersService } from './listSuppliers.service';

@Controller('suppliers/list')
export class ListSuppliersController {
  constructor(private listSuppliersService: ListSuppliersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Res() res: Response) {
    const suppliers = await this.listSuppliersService.list();
    if (suppliers.length < 1) {
      return res.status(400).send({ message: 'No supplier foubd!' });
    }
    return res.status(200).send(instanceToInstance(suppliers));
  }
}
