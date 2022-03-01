import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { DeleteShipmentService } from './deleteShipment.service';

@Controller('shipments')
export class DeleteShipmentController {
  constructor(private deleteShipmentService: DeleteShipmentService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async handle(@Query('id') id: string, @Res() res: Response) {
    await this.deleteShipmentService.delete(id);
    return res.status(200).send({});
  }
}
