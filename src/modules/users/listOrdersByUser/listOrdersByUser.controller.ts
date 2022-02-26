import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
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
  public async create(@Response() res) {
    const id = res.locals.user;
    if (!id) {
      throw new HttpException(
        'User not authenticated!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const orders = await this.listOrdersByUserService.list(id);
    return res.status(200).send(instanceToInstance(orders));
  }
}
