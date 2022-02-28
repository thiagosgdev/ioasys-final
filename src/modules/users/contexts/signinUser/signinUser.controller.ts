import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { SigninDTO } from 'src/shared/dtos/user/signin.dto';
import { SigninUserService } from './signinUser.service';

@Controller('users/signin')
export class SigninUserController {
  constructor(private signinUserService: SigninUserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() data: SigninDTO, @Res() res: Response) {
    try {
      const { email, password } = data;
      const tokens = await this.signinUserService.signin(email, password);
      if (tokens) {
        return res.status(200).send(instanceToInstance(tokens));
      }
      return res
        .status(400)
        .send({ message: 'Bad Request! Email and/or password wrong!' });
    } catch (error) {
      return res.status(500).send({ message: 'Internal server error!' });
    }
  }
}
