import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateCategoryDTO } from 'src/shared/dto/createCategory.dto';
import { CreateCategoryService } from './createCategory.service';

@Controller('categories')
export class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateCategoryDTO) {
    const user = await this.createCategoryService.create(data);
    return instanceToInstance(user);
  }
}
