import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import { UpdateCategoryService } from './updateCategory.service';
import { UpdateCategoryDTO } from 'src/shared/dtos/category/updateCategory.dto';

@Controller('categories')
export class UpdateCategoryController {
  constructor(private updateCategoryService: UpdateCategoryService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  public async handle(@Body() data: UpdateCategoryDTO, @Res() res: Response) {
    const category = await this.updateCategoryService.update(data);
    if (category) {
      return res.status(200).send(instanceToInstance(category));
    } else {
      return res.status(400).send({ message: 'Category not Updated!' });
    }
  }
}
