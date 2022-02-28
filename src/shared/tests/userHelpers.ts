import { CreateUserDTO } from 'src/shared/dtos/createUser.dto';
import { User } from 'src/shared/entities/user.entity';

export const mockCreateUserDTO = (): CreateUserDTO => ({
  first_name: 'First',
  last_name: 'Last',
  email: 'test@test.com',
  password: 'test_pass',
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
  created_at: new Date(),
  updated_at: null,
  deleted_at: null,
});
