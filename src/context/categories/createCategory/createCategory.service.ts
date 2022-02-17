import { Injectable, Inject } from '@nestjs/common';
import { CreateCategoryDTO } from 'src/shared/dto/createCategory.dto';
import { Category } from 'src/shared/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateCategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    const category = this.categoryRepository.create(data);
    await this.categoryRepository.save(category);

    return category;
  }
}
