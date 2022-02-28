import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import { CreateCategoryDTO } from 'src/shared/dtos/category/createCategory.dto';
import { CreateCategoryService } from './createCategory.service';

@Controller('categories')
export class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateCategoryDTO, @Res() res: Response) {
    const category = await this.createCategoryService.create(data);
    if (category) {
      return res.status(201).send(instanceToInstance(category));
    } else {
      return res.status(500).send({ message: 'Category not Created!' });
    }
  }
}
