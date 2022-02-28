import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateUserDTO } from 'src/shared/dtos/user/createUser.dto';
import { CreateUserService } from 'src/modules/users/contexts/createUser/createUser.service';
import { Response } from 'express';

@Controller('users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() createUserRequestBody: CreateUserDTO,
    @Res() res: Response,
  ) {
    const user = await this.createUserService.create(createUserRequestBody);
    if (user) {
      return res.status(201).send(instanceToInstance(user));
    } else {
      return res.status(400).send({ message: 'Category not Created!' });
    }
  }
}
