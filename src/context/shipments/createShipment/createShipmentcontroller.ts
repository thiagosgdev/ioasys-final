import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateShipmentDTO } from 'src/shared/dto/createShipment.dto';
import { CreateShipmentService } from './createShipment.service';

@Controller('shipments')
export class CreateShipmentController {
  constructor(private createShipmentService: CreateShipmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateShipmentDTO) {
    const shipment = await this.createShipmentService.create(data);
    return instanceToInstance(shipment);
  }
}
