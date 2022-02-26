import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { User } from 'src/shared/entities/user.entity';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { EnsureUserLoggedMiddleware } from 'src/shared/middleware/ensureLogged.middleware';
import { JwtProvider } from 'src/shared/providers/EncryptProvider/jwt.provider';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { CreateUserController } from './contexts/createUser/createUser.controller';
import { CreateUserService } from './contexts/createUser/createUser.service';
import { DeleteUserController } from './contexts/deleteUser/deleteUser.controller';
import { DeleteUserService } from './contexts/deleteUser/deleteUser.service';
import { FindUserByEmailController } from './contexts/findUserByEmail/findUserByEmail.controller';
import { FindUserByEmailService } from './contexts/findUserByEmail/findUserByEmail.service';
import { ListAddressesByUserController } from './contexts/listAddressesByUser/listAddressesByUser.controller';
import { ListAddressesByUserService } from './contexts/listAddressesByUser/listAddressesByUser.service';
import { ListOrdersByUserController } from './contexts/listOrdersByUser/listOrdersByUser.controller';
import { ListOrdersByUserService } from './contexts/listOrdersByUser/listOrdersByUser.service';
import { ListShipmentsByUserController } from './contexts/listShipmentsByUser/listShipmentsByUser.controller';
import { ListShipmentByUserService } from './contexts/listShipmentsByUser/listShipmentsByUser.service';
import { ListUsersController } from './contexts/listUsers/listUsers.controller';
import { ListUsersService } from './contexts/listUsers/listUsers.service';
import { RefreshUsersTokenController } from './contexts/refreshUsersToken/refreshUsersToken.controller';
import { RefreshUsersTokenService } from './contexts/refreshUsersToken/refreshUsersToken.service';
import { SigninUserController } from './contexts/signinUser/signinUser.controller';
import { SigninUserService } from './contexts/signinUser/signinUser.service';
import { UpdateUserController } from './contexts/updateUser/updateUser.controller';
import { UpdateUserService } from './contexts/updateUser/updateUser.service';
import { userProviders } from './user.provider';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
  providers: [
    { provide: 'HASH_PROVIDER', useClass: BcryptProvider },
    { provide: 'ENCRYPTER_PROVIDER', useClass: JwtProvider },
    ...userProviders,
    UserRepo,
    CreateUserService,
    FindUserByEmailService,
    ListUsersService,
    UpdateUserService,
    DeleteUserService,
    SigninUserService,
    ListOrdersByUserService,
    ListAddressesByUserService,
    ListShipmentByUserService,
    RefreshUsersTokenService,
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
    ListShipmentsByUserController,
    RefreshUsersTokenController,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureUserLoggedMiddleware)
      .forRoutes(
        UpdateUserController,
        DeleteUserController,
        RefreshUsersTokenController,
        ListShipmentsByUserController,
        ListOrdersByUserController,
        ListAddressesByUserController,
      );
    //consumer.apply(EnsureAdminMiddleware).forRoutes(ListUsersController);
  }
}
