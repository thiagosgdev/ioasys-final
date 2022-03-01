import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { FindShipmentByIdService } from './findShipmentById.service';

@Controller('shipments')
export class FindShipmentByIdController {
  constructor(private findShipmentByIdService: FindShipmentByIdService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handle(@Query('id') id: string, @Res() res: Response) {
    const shipment = await this.findShipmentByIdService.find(id);
    if (shipment) {
      return res.status(200).send(instanceToInstance(shipment));
    } else {
      return res
        .status(400)
        .send({ message: 'Bad Request! Verify the data provided!' });
    }
  }
}
