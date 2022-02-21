import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateOrderDTO } from 'src/shared/dto/createOrder.dto';
import { CreateOrderService } from './createOrder.service';

@Controller('orders')
export class CreateOrderController {
  constructor(private createOrderService: CreateOrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateOrderDTO) {
    const order = await this.createOrderService.create(data);
    return instanceToInstance(order);
  }
}
