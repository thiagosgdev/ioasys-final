import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Response,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListAddressesByUserService } from './listAddressesByUser.service';

@Controller('users/addresses')
export class ListAddressesByUserController {
  constructor(private listAddressesByUserService: ListAddressesByUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Response() res) {
    const id = res.locals.user;
    if (!id) {
      throw new HttpException(
        'User not authenticated!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const addresses = await this.listAddressesByUserService.list(id);
    return res.status(200).send(instanceToInstance(addresses));
  }
}
