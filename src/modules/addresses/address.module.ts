import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { Address } from 'src/shared/entities/address.entity';
import { EnsureUserLoggedMiddleware } from 'src/shared/middleware/ensureLogged.middleware';
import { AddressRepo } from 'src/modules/addresses/repository/address.repository';

import { addressProviders } from './address.provider';
import { CreateAddressController } from './contexts/createAddress/createAddress.controller';
import { CreateAddressService } from './contexts/createAddress/createAddress.service';
import { UpdateAddressController } from './contexts/updateAddress/updateAddress.controller';
import { UpdateAddressService } from './contexts/updateAddress/updateAddress.service';
import { ListAddressesByUserService } from '../users/contexts/listAddressesByUser/listAddressesByUser.service';
import { ListAddressesByUserController } from '../users/contexts/listAddressesByUser/listAddressesByUser.controller';
import { ListAddressesController } from './contexts/listAddresses/listAddresses.controller';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from '../users/repository/user.repository';
import { ListAddressesService } from './contexts/listAddresses/listAddresses.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Address, User])],
  providers: [
    ...addressProviders,
    UserRepo,
    AddressRepo,
    CreateAddressService,
    UpdateAddressService,
    ListAddressesByUserService,
    ListAddressesService,
  ],
  controllers: [
    CreateAddressController,
    UpdateAddressController,
    ListAddressesByUserController,
    ListAddressesController,
  ],
})
export class AddressModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureUserLoggedMiddleware)
      .forRoutes(
        CreateAddressController,
        UpdateAddressController,
        ListAddressesByUserController,
      );
  }
}
