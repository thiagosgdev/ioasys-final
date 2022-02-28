import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { mockResponse } from 'src/shared/tests/http';

import { mockUserModel } from 'src/shared/tests/userHelpers';
import { FindUserByEmailController } from './findUserByEmail.controller';
import { FindUserByEmailService } from './findUserByEmail.service';

const mockFindUserByEmailService = {
  findByEmail: jest.fn((dto) => {
    return mockUserModel();
  }),
};

describe('Find User by Email Controller', () => {
  let controller: FindUserByEmailController;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserByEmailController],
      providers: [FindUserByEmailService],
    })
      .overrideProvider(FindUserByEmailService)
      .useValue(mockFindUserByEmailService)
      .compile();

    controller = module.get<FindUserByEmailController>(
      FindUserByEmailController,
    );
  });

  it('Should return 200 on findByEmail() success', async () => {
    await controller.find('test@test.com', mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('Should return 404 on findByEmail() fail', async () => {
    jest
      .spyOn(mockFindUserByEmailService, 'findByEmail')
      .mockReturnValueOnce(await Promise.resolve(null));
    await controller.find('test@test.com', mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});
