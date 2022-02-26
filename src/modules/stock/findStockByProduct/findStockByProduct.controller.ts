import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { FindStockByProductService } from './findStockByProduct.service';

@Controller('stocks/product')
export class FindStockByProductController {
  constructor(private findStockByProductService: FindStockByProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string) {
    const stock = await this.findStockByProductService.find(id);
    return instanceToInstance(stock);
  }
}
