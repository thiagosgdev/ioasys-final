import { Injectable } from '@nestjs/common';
import { Category } from 'src/shared/entities/category.entity';
import { CategoryRepo } from 'src/modules/categories/repository/category.repository';
import { UpdateCategoryDTO } from 'src/shared/dtos/category/updateCategory.dto';

@Injectable()
export class UpdateCategoryService {
  constructor(private categoryRepository: CategoryRepo) {}

  async update(data: UpdateCategoryDTO): Promise<Category> {
    const category = this.categoryRepository.update(data);
    if (category) {
      return category;
    } else {
      return null;
    }
  }
}
