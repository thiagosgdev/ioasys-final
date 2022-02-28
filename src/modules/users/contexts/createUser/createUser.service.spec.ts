import { Test, TestingModule } from '@nestjs/testing';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { mockCreateUserDTO, mockUserModel } from 'src/shared/tests/userHelpers';
import { CreateUserService } from './createUser.service';

describe('User Service', () => {
  let service: CreateUserService;
  let repository: UserRepo;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepo,
          useValue: {
            create: jest.fn((dto) => {
              return mockUserModel();
            }),
            findByEmail: jest.fn((dto) => {
              return null;
            }),
          },
        },
        {
          provide: 'HASH_PROVIDER',
          useClass: BcryptProvider,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    repository = module.get<UserRepo>(UserRepo);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });

  it('Should call the repository with the correct values', async () => {
    const createSpy = jest.spyOn(service, 'create');
    await service.create(mockCreateUserDTO());
    expect(createSpy).toHaveBeenCalledWith(mockCreateUserDTO());
  });

  it('Should throw a ConflictException if findByEmail() return an user', async () => {
    jest
      .spyOn(repository, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(mockUserModel()));
    const response = service.create(mockCreateUserDTO());
    await expect(response).rejects.toThrow();
  });

  it('Should return the User on create() success', async () => {
    const user = await service.create(mockUserModel());
    expect(user).toHaveProperty('id');
  });

  it('Should return null on create() fail', async () => {
    jest.spyOn(service, 'create').mockReturnValueOnce(Promise.resolve(null));
    const user = await service.create(mockUserModel());
    expect(user).toBeNull();
  });

  it('Should throw if create() throws', async () => {
    jest
      .spyOn(service, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const response = service.create(mockUserModel());
    await expect(response).rejects.toThrow();
  });
});
