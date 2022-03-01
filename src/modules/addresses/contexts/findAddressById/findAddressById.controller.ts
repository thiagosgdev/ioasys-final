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
import { FindAddressesByIdService } from './findAddressById.service';

@Controller('addresses')
export class FindAddressesByIdController {
  constructor(private findAddressesByIdService: FindAddressesByIdService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handle(@Query('id') id: string, @Res() res: Response) {
    if (!id) {
      return res.status(400).send({ message: 'Bad Request! Verify the ID!' });
    }
    const address = await this.findAddressesByIdService.find(id);
    if (!address) {
      return res.status(400).send({ message: 'Bad Request! Verify the ID!' });
    }
    return res.status(200).send(instanceToInstance(address));
  }
}
