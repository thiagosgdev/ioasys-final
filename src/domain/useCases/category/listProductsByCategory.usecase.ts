import { Category } from 'src/shared/entities/category.entity';

export interface ListProductsByCategory {
  listProducts(id: string): Promise<Category[]>;
}
