import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Response,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListOrdersByUserService } from './listOrdersByUser.service';

@Controller('users/orders')
export class ListOrdersByUserController {
  constructor(private listOrdersByUserService: ListOrdersByUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handle(@Response() res) {
    const id = res.locals.user;
    if (!id) {
      return res.status(403).send({ message: 'User not authenticated' });
    }
    const orders = await this.listOrdersByUserService.list(id);
    if (orders.length < 1) {
      return res.status(404).send({ message: 'You have no orders!' });
    }
    return res.status(200).send(instanceToInstance(orders));
  }
}
