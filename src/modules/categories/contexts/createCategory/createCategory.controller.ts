import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateCategoryDTO } from 'src/shared/dtos/category/createCategory.dto';
import { CreateCategoryService } from './createCategory.service';

@Controller('categories')
export class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateCategoryDTO) {
    const category = await this.createCategoryService.create(data);
    return instanceToInstance(category);
  }
}
