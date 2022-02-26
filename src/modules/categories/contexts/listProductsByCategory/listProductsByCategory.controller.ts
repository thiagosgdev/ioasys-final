import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListProductsByCategoryService } from './listProductsByCategory.service';

@Controller('categories/list/products')
export class ListProductsByCategoryController {
  constructor(
    private listProductsByCategoryService: ListProductsByCategoryService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string) {
    const products = await this.listProductsByCategoryService.list(id);
    return instanceToInstance(products);
  }
}
