import { CreateProductDTO } from 'src/shared/dtos/product/createProduct.dto';
import { Product } from 'src/shared/entities/product.entity';

export interface CreateProduct {
  create(data: CreateProductDTO): Promise<Product>;
}
