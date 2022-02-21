import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListShipmentService } from './listShipment.service';

@Controller('shipments')
export class ListShipmentController {
  constructor(private listShipmentService: ListShipmentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create() {
    const shipment = await this.listShipmentService.list();
    return instanceToInstance(shipment);
  }
}
