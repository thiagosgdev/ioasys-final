import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { User } from 'src/shared/entities/user.entity';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { EnsureUserLoggedMiddleware } from 'src/shared/middleware/ensureLogged.middleware';
import { JwtProvider } from 'src/shared/providers/EncryptProvider/jwt.provider';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';
import { UserRepo } from 'src/shared/repositories/user.repository';
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
import { ListShipmentsByUserController } from './listShipmentsByUser/listShipmentsByUser.controller';
import { ListShipmentByUserService } from './listShipmentsByUser/listShipmentsByUser.service';
import { ListUsersController } from './listUsers/listUsers.controller';
import { ListUsersService } from './listUsers/listUsers.service';
import { RefreshUsersTokenController } from './refreshUsersToken/refreshUsersToken.controller';
import { RefreshUsersTokenService } from './refreshUsersToken/refreshUsersToken.service';
import { SigninUserController } from './signinUser/signinUser.controller';
import { SigninUserService } from './signinUser/signinUser.service';
import { UpdateUserController } from './updateUser/updateUser.controller';
import { UpdateUserService } from './updateUser/updateUser.service';
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
