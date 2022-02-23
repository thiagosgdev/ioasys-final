import { UpdateProductDTO } from 'src/shared/dtos/updateProduct.dto';
import { Product } from 'src/shared/entities/product.entity';

export interface UpdateProduct {
  update(data: UpdateProductDTO): Promise<Product>;
}
