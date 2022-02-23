import { Category } from 'src/shared/entities/category.entity';

export interface ListCategories {
  list(): Promise<Category[]>;
}
