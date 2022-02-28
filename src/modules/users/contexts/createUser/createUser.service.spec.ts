import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/shared/dtos/createUser.dto';
import { User } from 'src/shared/entities/user.entity';
import { Encrypter } from 'src/shared/providers/EncryptProvider/protocols/encrypter';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';
import { UserRepo } from '../../repository/user.repository';
import { CreateUserService } from './createUser.service';

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

const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new EncrypterStub();
};

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
              return mockUser();
            }),
            findByEmail: jest.fn((dto) => {
              return null;
            }),
          },
        },
        {
          provide: 'HASHER_PROVIDER',
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
      .mockReturnValueOnce(Promise.resolve(mockUser()));
    const response = service.create(mockCreateUserDTO());
    await expect(response).rejects.toThrow();
  });

  it('Should return the User on create() success', async () => {
    const user = await service.create(mockUser());
    expect(user).toHaveProperty('id');
  });

  it('Should return null on create() fail', async () => {
    jest.spyOn(service, 'create').mockReturnValueOnce(Promise.resolve(null));
    const user = await service.create(mockUser());
    expect(user).toBeNull();
  });

  it('Should throw if create() throws', async () => {
    jest
      .spyOn(service, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const response = service.create(mockUser());
    await expect(response).rejects.toThrow();
  });
});
