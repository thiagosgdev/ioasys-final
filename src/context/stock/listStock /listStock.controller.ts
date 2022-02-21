import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListStockService } from './listStock.service';

@Controller('stocks/list')
export class ListStockController {
  constructor(private listStockService: ListStockService) {}

  @Get()
  @HttpCode(HttpStatus.CREATED)
  public async create() {
    const stocks = await this.listStockService.list();
    return instanceToInstance(stocks);
  }
}
