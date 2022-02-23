import { Product } from 'src/shared/entities/product.entity';

export interface FindProductById {
  find(id: string): Promise<Product>;
}
