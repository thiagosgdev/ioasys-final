import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListShipmentByUserService } from './listShipmentsByUser.service';

@Controller('users/shipments')
export class ListShipmentsByUserController {
  constructor(private listShipmentByUserService: ListShipmentByUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async list(@Res() res) {
    const id = res.locals.user;
    if (!id) {
      return res.status(403).send({ message: 'User not authenticated' });
    }
    const shipments = await this.listShipmentByUserService.list(id);
    if (!shipments) {
      return res.status(404).send({ message: 'No shipment found!' });
    }
    return res.status(200).send(instanceToInstance(shipments));
  }
}
