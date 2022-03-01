import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { CreateShipmentController } from './contexts/createShipment/createShipment.controller';
import { CreateShipmentService } from './contexts/createShipment/createShipment.service';
import { shipmentProviders } from './shipments.provider';
import { ListShipmentService } from './contexts/listShipments/listShipment.service';
import { ListShipmentController } from './contexts/listShipments/listShipment.controller';
import { UpdateShipmentService } from './contexts/updateShipment/updateShipment.service';
import { UpdateShipmentController } from './contexts/updateShipment/updateShipmentcontroller';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { userProviders } from '../users/user.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from 'src/shared/entities/shipment.entity';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { ShipmentRepo } from './repository/shipment.repository';
import { DeleteShipmentService } from './contexts/deleteShipment/deleteShipment.service';
import { DeleteShipmentController } from './contexts/deleteShipment/deleteShipment.controller';
import { FindShipmentByIdController } from './contexts/findShipmentById/findShipmentById.controller';
import { FindShipmentByIdService } from './contexts/findShipmentById/findShipmentById.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Shipment, User])],
  providers: [
    ...shipmentProviders,
    ...userProviders,
    UserRepo,
    CreateShipmentService,
    ListShipmentService,
    UpdateShipmentService,
    ShipmentRepo,
    DeleteShipmentService,
    FindShipmentByIdService,
  ],
  controllers: [
    CreateShipmentController,
    ListShipmentController,
    UpdateShipmentController,
    DeleteShipmentController,
    FindShipmentByIdController,
  ],
})
export class ShipmentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAdminMiddleware).forRoutes('shipments');
  }
}
