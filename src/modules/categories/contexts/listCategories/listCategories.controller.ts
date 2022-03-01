import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { ListCategoriesService } from './listCategories.service';

@Controller('categories/list')
export class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Res() res: Response) {
    const categories = await this.listCategoriesService.list();
    if (categories.length < 1) {
      return res.status(404).send({ message: 'No categories found!' });
    }
    return res.status(200).send(instanceToInstance(categories));
  }
}
