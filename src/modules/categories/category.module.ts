import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { CategoryRepo } from 'src/shared/repositories/category.repository';
import { userProviders } from '../users/user.provider';

import { categoryProviders } from './category.provider';
import { CreateCategoryController } from './createCategory/createCategory.controller';
import { CreateCategoryService } from './createCategory/createCategory.service';
import { ListCategoriesController } from './listCategories/listCategories.controller';
import { ListCategoriesService } from './listCategories/listCategories.service';
import { ListProductsByCategoryController } from './listProductsByCategory/listProductsByCategory.controller';
import { ListProductsByCategoryService } from './listProductsByCategory/listProductsByCategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/shared/entities/category.entity';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/shared/repositories/user.repository';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Category, User])],
  providers: [
    ...categoryProviders,
    UserRepo,
    CategoryRepo,
    CreateCategoryService,
    ListCategoriesService,
    ListProductsByCategoryService,
  ],
  controllers: [
    CreateCategoryController,
    ListCategoriesController,
    ListProductsByCategoryController,
  ],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAdminMiddleware).forRoutes('categories');
  }
}
