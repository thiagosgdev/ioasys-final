import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { CreateShipmentDTO } from 'src/shared/dtos/shipment/createShipment.dto';
import { CreateShipmentService } from './createShipment.service';

@Controller('shipments')
export class CreateShipmentController {
  constructor(private createShipmentService: CreateShipmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async handle(@Body() data: CreateShipmentDTO, @Res() res: Response) {
    const shipment = await this.createShipmentService.create(data);
    if (!shipment) {
      return res.status(400).send({ message: 'Bad Request!' });
    }
    return res.status(201).send(instanceToInstance(shipment));
  }
}
