import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { RefreshUsersTokenService } from './refreshUsersToken.service';

@Controller('users/refreshtoken')
export class RefreshUsersTokenController {
  constructor(private refreshUsersTokenService: RefreshUsersTokenService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async handle(
    @Body('refresh_token') refresh_token: string,
    @Res() res: Response,
  ) {
    try {
      const token = await this.refreshUsersTokenService.refresh(refresh_token);
      if (!token) {
        return res.status(403).send('NOT AUTHORIZED!');
      }
      return res.status(200).send({ token: instanceToInstance(token) });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error!' });
    }
  }
}
