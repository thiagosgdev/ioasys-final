import { Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from 'src/shared/dtos/category/createCategory.dto';
import { Category } from 'src/shared/entities/category.entity';
import { CategoryRepo } from 'src/shared/repositories/category.repository';

@Injectable()
export class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepo) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    const category = this.categoryRepository.create(data);
    return category;
  }
}
