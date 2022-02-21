import { Injectable, Inject } from '@nestjs/common';
import { Category } from 'src/shared/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListProductsByCategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async list(id: string): Promise<Category[]> {
    const category = await this.categoryRepository.find({
      where: {
        id,
      },
      relations: ['products'],
    });

    return category;
  }
}
