import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateStockDTO } from 'src/shared/dtos/stock/createStock.dto';
import { CreateStockService } from './createStock.service';

@Controller('stocks')
export class CreateStockController {
  constructor(private createStockService: CreateStockService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateStockDTO) {
    const stock = await this.createStockService.create(data);
    return instanceToInstance(stock);
  }
}
