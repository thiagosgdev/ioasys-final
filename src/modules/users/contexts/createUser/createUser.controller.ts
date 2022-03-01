import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateUserService } from 'src/modules/users/contexts/createUser/createUser.service';
import { Response } from 'express';
import { CreateUserRequestDTO } from 'src/shared/dtos/user/createUserRequest.dto';

@Controller('users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() data: CreateUserRequestDTO,
    @Res() res: Response,
  ) {
    if (data.password != data.password_confirmation) {
      return res.status(400).send({ message: 'Passwords doesnt match!' });
    }
    const user = await this.createUserService.create(data);
    if (user) {
      return res.status(201).send(instanceToInstance(user));
    } else {
      return res.status(400).send({ message: 'User not Created!' });
    }
  }
}
