import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { DeleteStockService } from './deleteStock.service';

@Controller('stocks')
export class DeleteStockController {
  constructor(private deleteStockService: DeleteStockService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async handle(@Query('id') id: string, @Res() res: Response) {
    await this.deleteStockService.delete(id);

    return res.status(200).send({});
  }
}
