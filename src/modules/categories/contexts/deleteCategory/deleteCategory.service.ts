import { Injectable } from '@nestjs/common';
import { CategoryRepo } from 'src/modules/categories/repository/category.repository';

@Injectable()
export class DeleteCategoryService {
  constructor(private readonly categoryRepository: CategoryRepo) {}

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
