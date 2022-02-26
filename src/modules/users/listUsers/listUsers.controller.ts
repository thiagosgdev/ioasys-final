import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { ListUsersService } from './listUsers.service';

@Controller('users/list')
export class ListUsersController {
  constructor(private listUsersService: ListUsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create() {
    const user = await this.listUsersService.list();
    return instanceToInstance(user);
  }
}
