import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { CreateOrderDTO } from 'src/shared/dtos/order/createOrder.dto';
import { CreateOrderService } from './createOrder.service';

@Controller('orders')
export class CreateOrderController {
  constructor(private createOrderService: CreateOrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateOrderDTO, @Res() res: Response) {
    try {
      const id = res.locals.user;

      if (!id) {
        return res.status(403).send({ message: 'User not authenticated' });
      }
      data.user_id = id;
      const order = await this.createOrderService.create(data);
      if (order) {
        return res.status(201).send(instanceToInstance(order));
      } else {
        return res.status(400).send('Order not completed!');
      }
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error!' });
    }
  }
}
