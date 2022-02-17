import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';

import { categoryProviders } from './category.provider';
import { CreateCategoryController } from './createCategory/createCategory.controller';
import { CreateCategoryService } from './createCategory/createCategory.service';
import { ListCategoriesController } from './listCategories/listCategories.controller';
import { ListCategoriesService } from './listCategories/listCategories.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...categoryProviders,
    CreateCategoryService,
    ListCategoriesService,
  ],
  controllers: [CreateCategoryController, ListCategoriesController],
})
export class CategoryModule {}
