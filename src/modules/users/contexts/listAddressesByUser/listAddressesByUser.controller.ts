import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { ListAddressesByUserService } from './listAddressesByUser.service';

@Controller('users/addresses')
export class ListAddressesByUserController {
  constructor(private listAddressesByUserService: ListAddressesByUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async list(@Res() res: Response) {
    const id = res.locals.user;
    if (!id) {
      return res.status(403).send({ message: 'User not authenticated' });
    }
    const addresses = await this.listAddressesByUserService.list(id);
    if (addresses) {
      return res.status(200).send(instanceToInstance(addresses));
    }
    return res.status(404).send({ message: 'No address found!' });
  }
}
