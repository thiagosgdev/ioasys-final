import { Controller, Get, Headers, HttpCode, HttpStatus } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListOrdersByUserService } from './listOrdersByUser.service';

@Controller('users/orders')
export class ListOrdersByUserController {
  constructor(private listOrdersByUserService: ListOrdersByUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Headers('id') id: string) {
    const orders = await this.listOrdersByUserService.list(id);
    return instanceToInstance(orders);
  }
}
