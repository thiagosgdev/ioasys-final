import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { FindOrderByIdService } from './findOrderById.service';

@Controller('orders')
export class FindOrderByIdController {
  constructor(private findOrderByIdService: FindOrderByIdService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string) {
    const order = await this.findOrderByIdService.find(id);
    return order;
  }
}
