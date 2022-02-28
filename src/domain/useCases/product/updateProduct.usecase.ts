import { UpdateProductDTO } from 'src/shared/dtos/product/updateProduct.dto';
import { Product } from 'src/shared/entities/product.entity';

export interface UpdateProduct {
  update(data: UpdateProductDTO): Promise<Product>;
}
