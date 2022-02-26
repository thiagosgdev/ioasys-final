import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateOrderDTO } from 'src/shared/dtos/createOrder.dto';
import { CreateOrderService } from './createOrder.service';

@Controller('orders')
export class CreateOrderController {
  constructor(private createOrderService: CreateOrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateOrderDTO, @Res() res) {
    const id = res.locals.user;
    if (!id) {
      throw new HttpException(
        'User not authenticated!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    data.user_id = id;
    const order = await this.createOrderService.create(data);
    return instanceToInstance(order);
  }
}
