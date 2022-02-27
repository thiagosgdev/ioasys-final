import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from 'src/shared/entities/category.entity';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';
import { CategoryRepo } from '../../repository/category.repository';
import { CreateCategoryService } from './createCategory.service';

const mockCreateCategory = {
  create: jest.fn((dto) => {
    return mockCreateCategoryResponse();
  }),
};

const mockCreateCategoryDTO = () => ({
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

describe('Category Service', () => {
  let service: CreateCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCategoryService,
        {
          provide: CategoryRepo,
          useValue: {
            create: jest.fn((dto) => {
              return mockCreateCategoryResponse();
            }),
          },
        },
        {
          provide: 'HASH_PROVIDER',
          useValue: BcryptProvider,
        },
      ],
    }).compile();

    service = module.get<CreateCategoryService>(CreateCategoryService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });

  it('Should call the repository with the correct values', async () => {
    const createSpy = jest.spyOn(service, 'create');
    await service.create(mockCreateCategoryDTO());
    expect(createSpy).toHaveBeenCalledWith(mockCreateCategoryDTO());
  });

  it('Should return the category on create() success', async () => {
    const category = await service.create(mockCreateCategoryDTO);
    expect(category).toHaveProperty('id');
  });
});
