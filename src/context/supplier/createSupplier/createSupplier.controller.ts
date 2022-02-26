import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateSupplierDTO } from 'src/shared/dtos/supplier/createSupplier.dto';
import { CreateSupplierService } from './createSupplier.service';

@Controller('suppliers')
export class CreateSupplierController {
  constructor(private createSupplierService: CreateSupplierService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateSupplierDTO) {
    const supplier = await this.createSupplierService.create(data);
    return instanceToInstance(supplier);
  }
}
