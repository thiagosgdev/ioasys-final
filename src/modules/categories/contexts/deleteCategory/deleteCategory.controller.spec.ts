import { Test } from '@nestjs/testing';
import MockDate from 'mockdate';

import { DeleteCategoryController } from './deleteCategory.controller';
import { DeleteCategoryService } from './deleteCategory.service';

const mockDeleteCategoryService = {
  delete: jest.fn((id) => {
    return;
  }),
};

describe('Delete Category Controller', () => {
  let categoryController: DeleteCategoryController;

  beforeEach(async () => {
    MockDate.set(new Date());

    const moduleRef = await Test.createTestingModule({
      controllers: [DeleteCategoryController],
      providers: [DeleteCategoryService],
    })
      .overrideProvider(DeleteCategoryService)
      .useValue(mockDeleteCategoryService)
      .compile();

    categoryController = moduleRef.get<DeleteCategoryController>(
      DeleteCategoryController,
    );
  });

  describe('Delete Category', () => {
    it('Should call DeleteCategoryService with the correct id', async () => {
      const deleteSpy = jest.spyOn(mockDeleteCategoryService, 'delete');
      await categoryController.create({ id: 'test_id' });
      expect(deleteSpy).toHaveBeenCalledWith({ id: 'test_id' });
    });
  });
});
