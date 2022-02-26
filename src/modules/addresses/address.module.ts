import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { Address } from 'src/shared/entities/address.entity';
import { EnsureUserLoggedMiddleware } from 'src/shared/middleware/ensureLogged.middleware';
import { AddressRepo } from 'src/shared/repositories/address.repository';

import { addressProviders } from './address.provider';
import { CreateAddressController } from './createAddress/createAddress.controller';
import { CreateAddressService } from './createAddress/createAddress.service';
import { UpdateAddressController } from './updateAddress/updateAddress.controller';
import { UpdateAddressService } from './updateAddress/updateAddress.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Address])],
  providers: [
    ...addressProviders,
    AddressRepo,
    CreateAddressService,
    UpdateAddressService,
  ],
  controllers: [CreateAddressController, UpdateAddressController],
})
export class AddressModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureUserLoggedMiddleware).forRoutes('addresses');
  }
}
