import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';

import { FindSupplierByIdService } from './findSupplierById.service';

@Controller('suppliers')
export class FindSupplierByIdController {
  constructor(private findSupplierByIdService: FindSupplierByIdService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handle(@Query('id') id: string, @Res() res: Response) {
    const supplier = await this.findSupplierByIdService.find(id);
    if (supplier) {
      return res.status(200).send(instanceToInstance(supplier));
    } else {
      return res
        .status(400)
        .send({ message: 'Bad Request! Verify the data provided!' });
    }
  }
}
