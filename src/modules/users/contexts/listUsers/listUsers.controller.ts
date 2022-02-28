import { Controller, HttpCode, HttpStatus, Get, Res } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { ListUsersService } from './listUsers.service';

@Controller('users/list')
export class ListUsersController {
  constructor(private listUsersService: ListUsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handle(@Res() res: Response) {
    const user = await this.listUsersService.list();
    if (user.length < 1) {
      return res.status(404).send({ message: 'No data found!' });
    }
    return res.status(200).send(instanceToInstance(user));
  }
}
