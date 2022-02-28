import MockDate from 'mockdate';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

import { CreateUserController } from 'src/modules/users/contexts/createUser/createUser.controller';
import { CreateUserService } from 'src/modules/users/contexts/createUser/createUser.service';
import { CreateUserDTO } from 'src/shared/dtos/createUser.dto';
import { User } from 'src/shared/entities/user.entity';

const mockStatusResponse = {
  send: jest.fn((x) => x),
};
const mockResponse = {
  status: jest.fn((x) => mockStatusResponse),
  send: jest.fn((x) => x),
} as unknown as Response;

const mockCreateUserDTO = (): CreateUserDTO => ({
  first_name: 'First',
  last_name: 'Last',
  email: 'test@test.com',
  password: 'test_pass',
});

const mockUser = (): User => ({
  id: '79ee5a2b-6fb0-44f9-a936-0270057469bd',
  first_name: 'First',
  last_name: 'Last',
  email: 'test@test.com',
  password: 'test_pass',
  token: null,
  refresh_token: null,
  is_admin: false,
  orders: null,
  addresses: null,
  created_at: new Date(),
  updated_at: null,
  deleted_at: null,
});

const mockCreateUserService = {
  create: jest.fn((dto) => {
    return mockUser();
  }),
};

describe('UsersController', () => {
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
