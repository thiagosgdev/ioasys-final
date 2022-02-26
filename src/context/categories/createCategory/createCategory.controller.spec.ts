import { Test } from '@nestjs/testing';
import MockDate from 'mockdate';
import { CreateCategoryDTO } from 'src/shared/dtos/category/createCategory.dto';

import { Category } from 'src/shared/entities/category.entity';
import { CreateCategoryController } from './createCategory.controller';
import { CreateCategoryService } from './createCategory.service';

const mockCreateCategoryUseCase = {
  create: jest.fn((dto) => {
    return mockCreateCategoryResponse();
  }),
};

const mockCreateCategoryDTO = (): CreateCategoryDTO => ({
  name: 'test_category',
});

const mockCreateCategoryResponse = (): Category => ({
  id: '02a9c9b1-c291-45bd-a382-629ed0c767bb',
  name: 'test_category',
  products: null,
  created_at: new Date(),
  updated_at: null,
  deleted_at: null,
});

describe('Create Category Controller', () => {
  let categoryController: CreateCategoryController;

  beforeEach(async () => {
    MockDate.set(new Date());

    const moduleRef = await Test.createTestingModule({
      controllers: [CreateCategoryController],
      providers: [CreateCategoryService],
    })
      .overrideProvider(CreateCategoryService)
      .useValue(mockCreateCategoryUseCase)
      .compile();

    categoryController = moduleRef.get<CreateCategoryController>(
      CreateCategoryController,
    );
  });

  describe('Create Category', () => {
    it('Should return the Created Category', async () => {
      const result: Category = mockCreateCategoryResponse();

      expect(await categoryController.create(mockCreateCategoryDTO())).toEqual(
        result,
      );
    });
  });
});
