import { Injectable } from '@nestjs/common';
import { Category } from 'src/shared/entities/category.entity';
import { CategoryRepo } from 'src/modules/categories/repository/category.repository';

@Injectable()
export class ListProductsByCategoryService {
  constructor(private readonly categoryRepository: CategoryRepo) {}

  async list(id: string): Promise<Category[]> {
    const products = await this.categoryRepository.listProducts(id);

    return products;
  }
}
