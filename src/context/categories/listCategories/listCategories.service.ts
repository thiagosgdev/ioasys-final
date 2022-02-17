import { Injectable, Inject } from '@nestjs/common';
import { CreateCategoryDTO } from 'src/shared/dto/createCategory.dto';
import { Category } from 'src/shared/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListCategoriesService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async list(): Promise<Category[]> {
    const categories = await this.categoryRepository.query(
      'SELECT * FROM categories',
    );
    return categories;
  }
}
