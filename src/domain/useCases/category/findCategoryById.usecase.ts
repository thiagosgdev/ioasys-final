import { Category } from 'src/shared/entities/category.entity';

export interface FindCategoryById {
  find(id: string): Promise<Category>;
}
