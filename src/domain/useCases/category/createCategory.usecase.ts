import { CreateCategoryDTO } from 'src/shared/dtos/category/createCategory.dto';
import { Category } from 'src/shared/entities/category.entity';

export interface CreateCategory {
  create(data: CreateCategoryDTO): Promise<Category>;
}
