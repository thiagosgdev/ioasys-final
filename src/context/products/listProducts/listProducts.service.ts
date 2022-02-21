import { Injectable, Inject } from '@nestjs/common';
import { Product } from 'src/shared/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async list(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products;
  }
}
