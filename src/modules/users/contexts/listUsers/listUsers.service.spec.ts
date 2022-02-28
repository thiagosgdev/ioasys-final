import { Test, TestingModule } from '@nestjs/testing';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { mockUsersModel } from 'src/shared/tests/userHelpers';
import { ListUsersService } from './listUsers.service';

describe('User Service', () => {
  let service: ListUsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUsersService,
        {
          provide: UserRepo,
          useValue: {
            list: jest.fn((dto) => {
              return mockUsersModel();
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ListUsersService>(ListUsersService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });

  it('Should call the repository with the correct values', async () => {
    const createSpy = jest.spyOn(service, 'list');
    await service.list();
    expect(createSpy).toHaveBeenCalled();
  });

  it('Should return the Users on list() success', async () => {
    const user = await service.list();
    expect(user.length).toBeGreaterThan(0);
  });

  it('Should return null on findByEmail() fail', async () => {
    jest.spyOn(service, 'list').mockReturnValueOnce(Promise.resolve(null));
    const user = await service.list();
    expect(user).toBeNull();
  });

  it('Should throw if list() throws', async () => {
    jest
      .spyOn(service, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const user = service.list();
    await expect(user).rejects.toThrow();
  });
});
