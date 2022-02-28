import { Test, TestingModule } from '@nestjs/testing';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';
import {
  mockUpdatedUserModel,
  mockUpdateUserDTO,
} from 'src/shared/tests/userHelpers';
import { UpdateUserService } from './updateUser.service';

describe('User Service', () => {
  let service: UpdateUserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: UserRepo,
          useValue: {
            update: jest.fn((dto) => {
              return mockUpdatedUserModel();
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

    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });

  it('Should call the repository with the correct values', async () => {
    const updateSpy = jest.spyOn(service, 'update');
    await service.update('user_id', mockUpdateUserDTO());
    expect(updateSpy).toHaveBeenCalled();
  });

  it('Should return the updated user on update() success', async () => {
    const user = await service.update('user_id', mockUpdateUserDTO());
    expect(user).toHaveProperty('id');
  });

  it('Should return null on findByEmail() fail', async () => {
    jest.spyOn(service, 'update').mockReturnValueOnce(Promise.resolve(null));
    const user = await service.update('user_id', mockUpdateUserDTO());
    expect(user).toBeNull();
  });

  it('Should throw if list() throws', async () => {
    jest
      .spyOn(service, 'update')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const user = service.update('user_id', mockUpdateUserDTO());
    await expect(user).rejects.toThrow();
  });
});
