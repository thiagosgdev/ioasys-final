import { Injectable } from '@nestjs/common';
import { CategoryRepo } from 'src/shared/repositories/category.repository';

@Injectable()
export class DeleteCategoryService {
  constructor(private readonly categoryRepository: CategoryRepo) {}

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
