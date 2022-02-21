import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListProductsService } from './listProducts.service';

@Controller('products/list')
export class ListProductsController {
  constructor(private listProductsService: ListProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create() {
    const products = await this.listProductsService.list();
    return instanceToInstance(products);
  }
}
