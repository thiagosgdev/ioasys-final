import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { UpdateStockDTO } from 'src/shared/dtos/updateStock.dto';
import { UpdateStockService } from './updateStock.service';

@Controller('stocks')
export class UpdateStockController {
  constructor(private updateStockService: UpdateStockService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() data: UpdateStockDTO) {
    const stock = await this.updateStockService.update(data);
    return instanceToInstance(stock);
  }
}
