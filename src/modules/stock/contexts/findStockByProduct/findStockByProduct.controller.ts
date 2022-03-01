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
import { FindStockByProductService } from './findStockByProduct.service';

@Controller('stocks/product')
export class FindStockByProductController {
  constructor(private findStockByProductService: FindStockByProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string, @Res() res: Response) {
    if (!id) {
      return res.status(404).send({
        message: 'Bad Request! Check the id!',
      });
    }
    const stock = await this.findStockByProductService.find(id);
    return instanceToInstance(stock);
  }
}
