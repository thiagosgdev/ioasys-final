import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';

import { supplierProviders } from './supplier.provider';
import { CreateSupplierService } from './createSupplier/createSupplier.service';
import { CreateSupplierController } from './createSupplier/createSupplier.controller';
import { ListSuppliersService } from './listSuppliers/listSuppliers.service';
import { ListSuppliersController } from './listSuppliers/listSuppliers.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...supplierProviders,
    CreateSupplierService,
    ListSuppliersService,
  ],
  controllers: [CreateSupplierController, ListSuppliersController],
})
export class SupplierModule {}
