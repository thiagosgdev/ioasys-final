import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { CreateProductController } from './createProduct/createProducts.controller';
import { CreateProductService } from './createProduct/createProducts.service';
import { ListProductsController } from './listProducts/listProducts.controller';
import { ListProductsService } from './listProducts/listProducts.service';
import { productProviders } from './products.provider';
import { UpdateProductController } from './updateProduct/updateProduct.controller';
import { UpdateProductService } from './updateProduct/updateProduct.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...productProviders,
    CreateProductService,
    ListProductsService,
    UpdateProductService,
  ],
  controllers: [
    CreateProductController,
    ListProductsController,
    UpdateProductController,
  ],
})
export class ProductModule {}
