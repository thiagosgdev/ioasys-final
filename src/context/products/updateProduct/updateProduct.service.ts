import { Injectable, Inject } from '@nestjs/common';
import { UpdateProductDTO } from 'src/shared/dto/updateProduct.dto';
import { Product } from 'src/shared/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async update(data: UpdateProductDTO): Promise<Product> {
    const product = this.productRepository.query(
      'SELECT * FROM products WHERE id = $1',
      [data.id],
    );

    const updatedProduct = {
      ...product,
      ...data,
    };

    await this.productRepository.save(updatedProduct);

    return product;
  }
}
