import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';

import { supplierProviders } from './supplier.provider';
import { CreateSupplierService } from './contexts/createSupplier/createSupplier.service';
import { CreateSupplierController } from './contexts/createSupplier/createSupplier.controller';
import { ListSuppliersService } from './contexts/listSuppliers/listSuppliers.service';
import { ListSuppliersController } from './contexts/listSuppliers/listSuppliers.controller';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/shared/entities/supplier.entity';
import { SupplierRepo } from 'src/modules/supplier/repository/supplier.repository';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { UpdateSupplierService } from './contexts/updateSupplier/updateSupplier.service';
import { UpdateSupplierController } from './contexts/updateSupplier/updateSupplier.controller';
import { DeleteSupplierController } from './contexts/deleteSupplier/deleteSupplier.controller';
import { DeleteSupplierService } from './contexts/deleteSupplier/deleteSupplier.service';
import { FindSupplierByIdController } from './contexts/findSupplierById/findSupplierById.controller';
import { FindSupplierByIdService } from './contexts/findSupplierById/findSupplierById.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Supplier, User])],
  providers: [
    ...supplierProviders,
    UserRepo,
    SupplierRepo,
    CreateSupplierService,
    ListSuppliersService,
    UpdateSupplierService,
    DeleteSupplierService,
    FindSupplierByIdService,
  ],
  controllers: [
    CreateSupplierController,
    ListSuppliersController,
    UpdateSupplierController,
    DeleteSupplierController,
    FindSupplierByIdController,
  ],
})
export class SupplierModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAdminMiddleware).forRoutes('suppliers');
  }
}
