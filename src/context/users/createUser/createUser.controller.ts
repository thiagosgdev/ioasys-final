import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateUserDTO } from 'src/shared/dto/createUser.dto';
import { CreateUserService } from './createUser.service';

@Controller('users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createUserRequestBody: CreateUserDTO) {
    const user = await this.createUserService.create(createUserRequestBody);
    return instanceToInstance(user);
  }
}
