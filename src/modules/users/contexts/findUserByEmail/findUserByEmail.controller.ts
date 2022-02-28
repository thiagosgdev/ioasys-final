import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { FindUserByEmailService } from './findUserByEmail.service';

@Controller('users')
export class FindUserByEmailController {
  constructor(private findUserByEmailService: FindUserByEmailService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async find(@Body('email') email: string, @Res() res: Response) {
    try {
      const user = await this.findUserByEmailService.findByEmail(email);
      if (user) {
        return res.status(200).send(instanceToInstance(user));
      }
      return res.status(404).send({
        message: 'Error! Check the e-mail provided! Maybe there is a typo!',
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Internal Server Error!',
      });
    }
  }
}
