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
import { UserRepo } from 'src/shared/repositories/user.repository';
import { ShipmentRepo } from './repository/shipment.repository';

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
  ],
  controllers: [
    CreateShipmentController,
    ListShipmentController,
    UpdateShipmentController,
  ],
})
export class ShipmentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAdminMiddleware).forRoutes('shipments');
  }
}
