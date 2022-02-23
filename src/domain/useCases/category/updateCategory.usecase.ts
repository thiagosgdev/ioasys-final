import { UpdateCategoryDTO } from 'src/shared/dtos/category/updateCategory.dto';
import { Category } from 'src/shared/entities/category.entity';

export interface UpdateCategory {
  update(data: UpdateCategoryDTO): Promise<Category>;
}
