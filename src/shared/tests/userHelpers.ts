import { CreateUserDTO } from 'src/shared/dtos/user/createUser.dto';
import { User } from 'src/shared/entities/user.entity';
import { UpdateUserDTO } from 'src/shared/dtos/user/updateUser.dto';

export const mockCreateUserDTO = (): CreateUserDTO => ({
  first_name: 'First',
  last_name: 'Last',
  email: 'test@test.com',
  password: 'test_pass',
});

export const mockUpdateUserDTO = (): UpdateUserDTO => ({
  id: '79ee5a2b-6fb0-44f9-a936-0270057469bd',
  first_name: 'Updated name',
  last_name: 'Last',
  email: 'test@test.com',
  password: 'test_pass',
  token: null,
});

export const mockUserModel = (): User => ({
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
  shipments: null,
  created_at: new Date(),
  updated_at: null,
  deleted_at: null,
});

export const mockUpdatedUserModel = (): User => ({
  id: '79ee5a2b-6fb0-44f9-a936-0270057469bd',
  first_name: 'Updated name',
  last_name: 'Last',
  email: 'test@test.com',
  password: 'test_pass',
  token: 'token',
  refresh_token: 'refresh_token',
  is_admin: false,
  orders: null,
  addresses: null,
  shipments: null,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
});

export const mockUsersModel = (): User[] => [
  {
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
    shipments: null,
    created_at: new Date(),
    updated_at: null,
    deleted_at: null,
  },
  {
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
    shipments: null,
    created_at: new Date(),
    updated_at: null,
    deleted_at: null,
  },
];
