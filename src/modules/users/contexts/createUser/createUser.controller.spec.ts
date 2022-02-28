import MockDate from 'mockdate';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserController } from 'src/modules/users/contexts/createUser/createUser.controller';
import { CreateUserService } from 'src/modules/users/contexts/createUser/createUser.service';
import { mockCreateUserDTO, mockUserModel } from 'src/shared/tests/userHelpers';
import { mockResponse } from 'src/shared/tests/http';

const mockCreateUserService = {
  create: jest.fn((dto) => {
    return mockUserModel();
  }),
};

describe('Create User Controller', () => {
  let controller: CreateUserController;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [CreateUserService],
    })
      .overrideProvider(CreateUserService)
      .useValue(mockCreateUserService)
      .compile();

    controller = module.get<CreateUserController>(CreateUserController);
  });

  it('Should 201 on create() success)', async () => {
    await controller.create(mockCreateUserDTO(), mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it('Should create a user', async () => {
    jest
      .spyOn(mockCreateUserService, 'create')
      .mockReturnValueOnce(await Promise.resolve(null));
    await controller.create(mockCreateUserDTO(), mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});
