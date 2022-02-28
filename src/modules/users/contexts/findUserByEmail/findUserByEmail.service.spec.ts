import { Test, TestingModule } from '@nestjs/testing';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { mockUserModel } from 'src/shared/tests/userHelpers';
import { FindUserByEmailService } from './findUserByEmail.service';

describe('User Service', () => {
  let service: FindUserByEmailService;
  let repository: UserRepo;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailService,
        {
          provide: UserRepo,
          useValue: {
            findByEmail: jest.fn((dto) => {
              return mockUserModel();
            }),
          },
        },
      ],
    }).compile();

    service = module.get<FindUserByEmailService>(FindUserByEmailService);
    repository = module.get<UserRepo>(UserRepo);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });

  it('Should call the repository with the correct values', async () => {
    const createSpy = jest.spyOn(service, 'findByEmail');
    await service.findByEmail('test@test.com');
    expect(createSpy).toHaveBeenCalledWith('test@test.com');
  });

  it('Should return the User on findByEmail() success', async () => {
    const user = await service.findByEmail('test@test.com');
    expect(user).toHaveProperty('id');
  });

  it('Should return null on findByEmail() fail', async () => {
    jest
      .spyOn(service, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(null));
    const user = await service.findByEmail('test@test.com');
    expect(user).toBeNull();
  });

  it('Should throw if findByEmail() throws', async () => {
    jest
      .spyOn(service, 'findByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const user = service.findByEmail('test@test.com');
    await expect(user).rejects.toThrow();
  });
});
