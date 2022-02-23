import { Product } from 'src/shared/entities/product.entity';

export interface ListProducts {
  list(): Promise<Product[]>;
}
