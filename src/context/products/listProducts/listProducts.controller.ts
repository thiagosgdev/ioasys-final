import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListProductsService } from './listProducts.service';

@Controller('products/list')
export class ListProductsController {
  constructor(private listProductsService: ListProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create() {
    try {
      const products = await this.listProductsService.list();
      return instanceToInstance(products);
    } catch (err) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
