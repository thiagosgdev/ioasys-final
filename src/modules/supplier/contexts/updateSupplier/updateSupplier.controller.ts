import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { UpdateSupplierDTO } from 'src/shared/dtos/supplier/updateSupplier.dto';
import { UpdateSupplierService } from './updateSupplier.service';

@Controller('suppliers')
export class UpdateSupplierController {
  constructor(private updateSupplierService: UpdateSupplierService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() data: UpdateSupplierDTO, @Res() res: Response) {
    const supplier = await this.updateSupplierService.update(data);
    if (!supplier) {
      return res.status(400).send({ message: 'Supplier not Updated!' });
    }
    return res.status(200).send(instanceToInstance(supplier));
  }
}
