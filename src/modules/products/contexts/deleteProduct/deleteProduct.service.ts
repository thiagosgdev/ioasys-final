import { Injectable } from '@nestjs/common';
import { ProductRepo } from 'src/modules/products/repository/product.repository';

@Injectable()
export class DeleteProductService {
  constructor(private productRepository: ProductRepo) {}

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
