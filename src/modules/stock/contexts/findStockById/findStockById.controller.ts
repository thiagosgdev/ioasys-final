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
import { FindStockByIdService } from './findStockById.service';

@Controller('stocks')
export class FindStockByIdController {
  constructor(private findStockByIdService: FindStockByIdService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string, @Res() res: Response) {
    const stock = await this.findStockByIdService.find(id);
    if (!stock) {
      return res.status(400).send({
        message: 'Bad Request! Check the id!',
      });
    }
    return res.status(200).send({
      stock: instanceToInstance(stock),
    });
  }
}
