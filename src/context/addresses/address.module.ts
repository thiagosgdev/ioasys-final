import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';

import { addressProviders } from './address.provider';
import { CreateAddressController } from './createAddress/createAddress.controller';
import { CreateAddressService } from './createAddress/createAddress.service';
import { FindAddressesByUserController } from './findAddressesByUser/findAddressesByUser.controller';
import { FindAddressesByUserService } from './findAddressesByUser/findAddressesByUser.service';
import { UpdateAddressController } from './updateAddress/updateAddress.controller';
import { UpdateAddressService } from './updateAddress/updateAddress.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...addressProviders,
    CreateAddressService,
    FindAddressesByUserService,
    UpdateAddressService,
  ],
  controllers: [
    CreateAddressController,
    FindAddressesByUserController,
    UpdateAddressController,
  ],
})
export class AddressModule {}
