import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { UpdateShipmentDTO } from 'src/shared/dtos/shipment/updateShipment.dto';
import { UpdateShipmentService } from './updateShipment.service';

@Controller('shipments')
export class UpdateShipmentController {
  constructor(private updateShipmentService: UpdateShipmentService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() data: UpdateShipmentDTO) {
    const shipment = await this.updateShipmentService.update(data);
    return instanceToInstance(shipment);
  }
}
