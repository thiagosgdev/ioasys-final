import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { CreateUserController } from './createUser/createUser.controller';
import { CreateUserService } from './createUser/createUser.service';
import { FindUserByEmailController } from './findUserByEmail/findUserByEmail.controller';
import { FindUserByEmailService } from './findUserByEmail/findUserByEmail.service';
import { ListUsersController } from './listUsers/listUsers.controller';
import { ListUsersService } from './listUsers/listUsers.service';
import { userProviders } from './user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    CreateUserService,
    FindUserByEmailService,
    ListUsersService,
  ],
  controllers: [
    CreateUserController,
    FindUserByEmailController,
    ListUsersController,
  ],
})
export class UserModule {}
