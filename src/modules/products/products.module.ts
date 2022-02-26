import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { Product } from 'src/shared/entities/product.entity';
import { User } from 'src/shared/entities/user.entity';
import { ProductRepo } from 'src/modules/products/repository/product.repository';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { EnsureAdminMiddleware } from '../../shared/middleware/ensureAdmin.middleware';
import { CreateProductController } from './contexts/createProduct/createProducts.controller';
import { CreateProductService } from './contexts/createProduct/createProducts.service';
import { DeleteProductController } from './contexts/deleteProduct/deleteProduct.controller';
import { DeleteProductService } from './contexts/deleteProduct/deleteProduct.service';
import { ListProductsController } from './contexts/listProducts/listProducts.controller';
import { ListProductsService } from './contexts/listProducts/listProducts.service';
import { productProviders } from './products.provider';
import { UpdateProductController } from './contexts/updateProduct/updateProduct.controller';
import { UpdateProductService } from './contexts/updateProduct/updateProduct.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Product, User])],
  providers: [
    ...productProviders,
    ProductRepo,
    UserRepo,
    CreateProductService,
    ListProductsService,
    UpdateProductService,
    DeleteProductService,
  ],
  controllers: [
    CreateProductController,
    ListProductsController,
    UpdateProductController,
    DeleteProductController,
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAdminMiddleware).forRoutes('products');
  }
}
