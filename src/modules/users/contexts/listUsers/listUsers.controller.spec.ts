import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import { mockResponse } from 'src/shared/tests/http';
import { mockUsersModel } from 'src/shared/tests/userHelpers';
import { ListUsersController } from './listUsers.controller';
import { ListUsersService } from './listUsers.service';

const mockListUsersService = {
  list: jest.fn((dto) => {
    return mockUsersModel();
  }),
};

describe('List Users Controller', () => {
  let controller: ListUsersController;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListUsersController],
      providers: [ListUsersService],
    })
      .overrideProvider(ListUsersService)
      .useValue(mockListUsersService)
      .compile();

    controller = module.get<ListUsersController>(ListUsersController);
  });

  it('Should return 200 on list() success', async () => {
    await controller.handle(mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('Should return 404 on list() fail', async () => {
    jest
      .spyOn(mockListUsersService, 'list')
      .mockReturnValueOnce(await Promise.resolve([]));
    await controller.handle(mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});
