import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListCategoriesService } from './listCategories.service';

@Controller('categories/list')
export class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create() {
    const user = await this.listCategoriesService.list();
    return instanceToInstance(user);
  }
}
