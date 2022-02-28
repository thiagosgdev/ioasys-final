import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import { mockResponse } from 'src/shared/tests/http';
import {
  mockUpdatedUserModel,
  mockUpdateUserDTO,
} from 'src/shared/tests/userHelpers';
import { UpdateUserController } from './updateUser.controller';
import { UpdateUserService } from './updateUser.service';

const mockUpdateUsersService = {
  update: jest.fn((dto) => {
    return mockUpdatedUserModel();
  }),
};

describe('Update User Controller', () => {
  let controller: UpdateUserController;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [UpdateUserService],
    })
      .overrideProvider(UpdateUserService)
      .useValue(mockUpdateUsersService)
      .compile();

    controller = module.get<UpdateUserController>(UpdateUserController);
  });

  it('Should return 200 on update() success', async () => {
    mockResponse.locals.user = 'user_id';
    await controller.handle(mockUpdateUserDTO(), mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('Should return 403 if the token is invalid', async () => {
    mockResponse.locals.user = null;
    await controller.handle(mockUpdateUserDTO(), mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
  });

  it('Should return 404 on update() fail', async () => {
    mockResponse.locals.user = 'user_id';
    jest
      .spyOn(mockUpdateUsersService, 'update')
      .mockReturnValueOnce(await Promise.resolve(null));
    await controller.handle(mockUpdateUserDTO(), mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});
