import { Injectable, Inject } from '@nestjs/common';
import { CreateProductDTO } from 'src/shared/dto/createProduct.dto';
import { Product } from 'src/shared/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async create(data: CreateProductDTO): Promise<Product> {
    const product = this.productRepository.create(data);
    await this.productRepository.save(product);

    return product;
  }
}
