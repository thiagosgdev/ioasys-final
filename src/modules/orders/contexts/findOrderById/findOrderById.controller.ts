import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';

import { FindOrderByIdService } from './findOrderById.service';

@Controller('orders')
export class FindOrderByIdController {
  constructor(private findOrderByIdService: FindOrderByIdService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string, @Res() res: Response) {
    const order = await this.findOrderByIdService.find(id);
    if (!order) {
      return res.status(400).send({ message: 'Bad Request! Verify the id' });
    }
    return res.status(200).send(instanceToInstance(order));
  }
}
