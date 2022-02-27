import { Injectable } from '@nestjs/common';
import { CategoryRepo } from 'src/modules/categories/repository/category.repository';
import { DeleteCategoryDTO } from 'src/shared/dtos/category/deleteCategory.dto';

@Injectable()
export class DeleteCategoryService {
  constructor(private readonly categoryRepository: CategoryRepo) {}

  async delete(data: DeleteCategoryDTO): Promise<void> {
    await this.categoryRepository.delete(data.id);
  }
}
