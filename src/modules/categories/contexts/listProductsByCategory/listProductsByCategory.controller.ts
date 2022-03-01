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
import { ListProductsByCategoryService } from './listProductsByCategory.service';

@Controller('categories/list/products')
export class ListProductsByCategoryController {
  constructor(
    private listProductsByCategoryService: ListProductsByCategoryService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string, @Res() res: Response) {
    const products = await this.listProductsByCategoryService.list(id);
    if (products.length < 1) {
      return res.status(404).send({ message: 'Nothing found!' });
    }
    return res.status(200).send(instanceToInstance(products));
  }
}
