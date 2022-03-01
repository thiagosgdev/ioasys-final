import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { CategoryRepo } from 'src/modules/categories/repository/category.repository';

import { categoryProviders } from './category.provider';
import { CreateCategoryController } from './contexts/createCategory/createCategory.controller';
import { CreateCategoryService } from './contexts/createCategory/createCategory.service';
import { ListCategoriesController } from './contexts/listCategories/listCategories.controller';
import { ListCategoriesService } from './contexts/listCategories/listCategories.service';
import { ListProductsByCategoryController } from './contexts/listProductsByCategory/listProductsByCategory.controller';
import { ListProductsByCategoryService } from './contexts/listProductsByCategory/listProductsByCategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/shared/entities/category.entity';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { DeleteCategoryService } from './contexts/deleteCategory/deleteCategory.service';
import { DeleteCategoryController } from './contexts/deleteCategory/deleteCategory.controller';
import { UpdateCategoryService } from './contexts/updateCategory/updateCategory.service';
import { UpdateCategoryController } from './contexts/updateCategory/updateCategory.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Category, User])],
  providers: [
    ...categoryProviders,
    UserRepo,
    CategoryRepo,
    CreateCategoryService,
    ListCategoriesService,
    ListProductsByCategoryService,
    DeleteCategoryService,
    UpdateCategoryService,
  ],
  controllers: [
    CreateCategoryController,
    ListCategoriesController,
    ListProductsByCategoryController,
    DeleteCategoryController,
    UpdateCategoryController,
  ],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAdminMiddleware).forRoutes('categories');
  }
}
