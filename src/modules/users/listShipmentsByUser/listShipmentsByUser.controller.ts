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
import { ListShipmentByUserService } from './listShipmentsByUser.service';

@Controller('users/shipments')
export class ListShipmentsByUserController {
  constructor(private listShipmentByUserService: ListShipmentByUserService) {}

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
    const orders = await this.listShipmentByUserService.list(id);
    return instanceToInstance(orders);
  }
}
