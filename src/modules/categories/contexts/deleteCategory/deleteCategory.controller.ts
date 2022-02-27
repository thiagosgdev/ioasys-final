import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DeleteCategoryDTO } from 'src/shared/dtos/category/deleteCategory.dto';

import { DeleteCategoryService } from './deleteCategory.service';

@Controller('categories')
export class DeleteCategoryController {
  constructor(private deleteCategoryService: DeleteCategoryService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async create(@Query() data: DeleteCategoryDTO) {
    await this.deleteCategoryService.delete(data);
  }
}
