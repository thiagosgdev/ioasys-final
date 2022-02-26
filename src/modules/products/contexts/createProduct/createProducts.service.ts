import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from 'src/shared/dtos/createProduct.dto';
import { Product } from 'src/shared/entities/product.entity';
import { ProductRepo } from 'src/modules/products/repository/product.repository';

@Injectable()
export class CreateProductService {
  constructor(private productRepository: ProductRepo) {}

  async create(data: CreateProductDTO): Promise<Product> {
    const product = this.productRepository.create(data);
    return product;
  }
}
