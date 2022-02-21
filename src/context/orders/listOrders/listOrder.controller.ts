import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListOrdersService } from './listOrder.service';

@Controller('orders/list')
export class ListOrdersController {
  constructor(private listOrdersService: ListOrdersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create() {
    const orders = await this.listOrdersService.list();
    return instanceToInstance(orders);
  }
}
