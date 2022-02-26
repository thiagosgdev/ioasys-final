import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { Product } from 'src/shared/entities/product.entity';
import { User } from 'src/shared/entities/user.entity';
import { ProductRepo } from 'src/shared/repositories/product.repository';
import { UserRepo } from 'src/shared/repositories/user.repository';
import { EnsureAdminMiddleware } from '../../shared/middleware/ensureAdmin.middleware';
import { CreateProductController } from './createProduct/createProducts.controller';
import { CreateProductService } from './createProduct/createProducts.service';
import { DeleteProductController } from './deleteProduct/deleteProduct.controller';
import { DeleteProductService } from './deleteProduct/deleteProduct.service';
import { ListProductsController } from './listProducts/listProducts.controller';
import { ListProductsService } from './listProducts/listProducts.service';
import { productProviders } from './products.provider';
import { UpdateProductController } from './updateProduct/updateProduct.controller';
import { UpdateProductService } from './updateProduct/updateProduct.service';

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
