import { Injectable } from '@nestjs/common';
import { UpdateProductDTO } from 'src/shared/dtos/updateProduct.dto';
import { Product } from 'src/shared/entities/product.entity';
import { ProductRepo } from 'src/shared/repositories/product.repository';

@Injectable()
export class UpdateProductService {
  constructor(private productRepository: ProductRepo) {}

  async update(data: UpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.update(data);
    return product;
  }
}
