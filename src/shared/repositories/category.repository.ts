import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategory } from 'src/domain/useCases/category/createCategory.usecase';
import { DeleteCategory } from 'src/domain/useCases/category/deleteCategory.usecase';
import { FindCategoryById } from 'src/domain/useCases/category/findCategoryById.usecase';
import { ListCategories } from 'src/domain/useCases/category/listCategories.usecase';
import { ListProductsByCategory } from 'src/domain/useCases/category/listProductsByCategory.usecase';
import { UpdateCategory } from 'src/domain/useCases/category/updateCategory.usecase';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from '../dtos/category/createCategory.dto';
import { UpdateCategoryDTO } from '../dtos/category/updateCategory.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepo
  implements
    CreateCategory,
    FindCategoryById,
    UpdateCategory,
    DeleteCategory,
    ListCategories,
    ListProductsByCategory
{
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    const category = this.repository.create(data);
    await this.repository.save(category);
    return category;
  }

  async update(data: UpdateCategoryDTO): Promise<Category> {
    const category = await this.repository.findOne({ id: data.id });
    if (!category) {
      return null;
    }
    await this.repository.save({
      ...category,
      ...data,
    });
    const newCategory = await this.repository.findOne({ id: data.id });
    return newCategory;
  }

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }

  async find(id: string): Promise<Category> {
    return await this.repository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async listProducts(id: string): Promise<Category[]> {
    const categories = await this.repository.find({
      where: {
        id,
      },
      relations: ['products'],
    });
    return categories;
  }
}
