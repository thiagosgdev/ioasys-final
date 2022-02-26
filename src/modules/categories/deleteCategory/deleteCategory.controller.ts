import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { DeleteCategoryService } from './deleteCategory.service';

@Controller('categories/list')
export class DeleteCategoryController {
  constructor(private deleteCategoryService: DeleteCategoryService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string) {
    await this.deleteCategoryService.delete(id);
  }
}
