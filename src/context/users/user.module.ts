import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { JwtProvider } from 'src/shared/providers/CriptographyProvider/jwt.provider';
import { BcryptProvider } from 'src/shared/providers/EncryptProvider/bcrypt.provider';
import { CreateUserController } from './createUser/createUser.controller';
import { CreateUserService } from './createUser/createUser.service';
import { DeleteUserController } from './deleteUser/deleteUser.controller';
import { DeleteUserService } from './deleteUser/deleteUser.service';
import { FindUserByEmailController } from './findUserByEmail/findUserByEmail.controller';
import { FindUserByEmailService } from './findUserByEmail/findUserByEmail.service';
import { ListAddressesByUserController } from './listAddressesByUser/listAddressesByUser.controller';
import { ListAddressesByUserService } from './listAddressesByUser/listAddressesByUser.service';
import { ListOrdersByUserController } from './listOrdersByUser/listOrdersByUser.controller';
import { ListOrdersByUserService } from './listOrdersByUser/listOrdersByUser.service';
import { ListUsersController } from './listUsers/listUsers.controller';
import { ListUsersService } from './listUsers/listUsers.service';
import { SigninUserController } from './signinUser/signinUser.controller';
import { SigninUserService } from './signinUser/signinUser.service';
import { UpdateUserController } from './updateUser/updateUser.controller';
import { UpdateUserService } from './updateUser/updateUser.service';
import { userProviders } from './user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    { provide: 'HASH_PROVIDER', useClass: BcryptProvider },
    { provide: 'ENCRYPTER_PROVIDER', useClass: JwtProvider },
    ...userProviders,
    CreateUserService,
    FindUserByEmailService,
    ListUsersService,
    UpdateUserService,
    DeleteUserService,
    SigninUserService,
    ListOrdersByUserService,
    ListAddressesByUserService,
  ],
  controllers: [
    CreateUserController,
    FindUserByEmailController,
    ListUsersController,
    UpdateUserController,
    DeleteUserController,
    SigninUserController,
    ListOrdersByUserController,
    ListAddressesByUserController,
  ],
})
export class UserModule {}
