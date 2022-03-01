import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { UpdateOrderDTO } from 'src/shared/dtos/order/updateOrder.dto';
import { UpdateOrderService } from './updateOrder.service';

@Controller('orders')
export class UpdateOrderController {
  constructor(private updateOrderService: UpdateOrderService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  public async update(@Body() data: UpdateOrderDTO, @Res() res: Response) {
    try {
      const order = await this.updateOrderService.update(data);
      if (order) {
        return res.status(200).send(instanceToInstance(order));
      } else {
        return res.status(400).send('Order not updated!');
      }
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error!' });
    }
  }
}
