import { Injectable } from '@nestjs/common';
import { Category } from 'src/shared/entities/category.entity';
import { CategoryRepo } from 'src/modules/categories/repository/category.repository';

@Injectable()
export class ListCategoriesService {
  constructor(private readonly categoryRepository: CategoryRepo) {}

  async list(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}
