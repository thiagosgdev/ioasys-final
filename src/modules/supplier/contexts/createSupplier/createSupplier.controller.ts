import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { CreateSupplierDTO } from 'src/shared/dtos/supplier/createSupplier.dto';
import { CreateSupplierService } from './createSupplier.service';

@Controller('suppliers')
export class CreateSupplierController {
  constructor(private createSupplierService: CreateSupplierService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateSupplierDTO, @Res() res: Response) {
    const supplier = await this.createSupplierService.create(data);
    if (!supplier) {
      return res.status(400).send({ message: 'Supplier not Updated!' });
    }
    return res.status(200).send(instanceToInstance(supplier));
  }
}
