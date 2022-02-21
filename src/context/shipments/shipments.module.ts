import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { CreateShipmentController } from './createShipment/createShipmentcontroller';
import { CreateShipmentService } from './createShipment/createShipment.service';
import { shipmentProviders } from './shipments.provider';
import { ListShipmentService } from './listShipments/listShipment.service';
import { ListShipmentController } from './listShipments/listShipmentcontroller';

@Module({
  imports: [DatabaseModule],
  providers: [...shipmentProviders, CreateShipmentService, ListShipmentService],
  controllers: [CreateShipmentController, ListShipmentController],
})
export class ShipmentModule {}
