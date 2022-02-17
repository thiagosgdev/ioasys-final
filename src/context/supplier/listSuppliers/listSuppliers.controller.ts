import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListSuppliersService } from './listSuppliers.service';

@Controller('suppliers/list')
export class ListSuppliersController {
  constructor(private listSuppliersService: ListSuppliersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create() {
    const suppliers = await this.listSuppliersService.list();
    return instanceToInstance(suppliers);
  }
}
