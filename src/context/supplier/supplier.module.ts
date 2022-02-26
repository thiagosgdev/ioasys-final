import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';

import { supplierProviders } from './supplier.provider';
import { CreateSupplierService } from './createSupplier/createSupplier.service';
import { CreateSupplierController } from './createSupplier/createSupplier.controller';
import { ListSuppliersService } from './listSuppliers/listSuppliers.service';
import { ListSuppliersController } from './listSuppliers/listSuppliers.controller';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { userProviders } from '../users/user.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/shared/entities/supplier.entity';
import { SupplierRepo } from 'src/shared/repositories/supplier.repository';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/shared/repositories/user.repository';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Supplier, User])],
  providers: [
    ...supplierProviders,
    UserRepo,
    SupplierRepo,
    CreateSupplierService,
    ListSuppliersService,
  ],
  controllers: [CreateSupplierController, ListSuppliersController],
})
export class SupplierModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAdminMiddleware).forRoutes('suppliers');
  }
}
