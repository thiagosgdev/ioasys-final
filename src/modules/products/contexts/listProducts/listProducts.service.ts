import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from 'src/shared/entities/product.entity';
import { ProductRepo } from 'src/modules/products/repository/product.repository';

@Injectable()
export class ListProductsService {
  constructor(private productRepository: ProductRepo) {}

  async list(): Promise<Product[]> {
    const products = await this.productRepository.list();
    if (products.length < 0) {
      throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    }
    return products;
  }
}
