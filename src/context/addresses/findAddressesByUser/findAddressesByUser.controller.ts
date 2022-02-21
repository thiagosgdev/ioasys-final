import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { FindAddressesByUserService } from './findAddressesByUser.service';

@Controller('address')
export class FindAddressesByUserController {
  constructor(private findAddressesByUserService: FindAddressesByUserService) {}

  @Get()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Query('id') id: string) {
    const address = await this.findAddressesByUserService.find(id);
    return instanceToInstance(address);
  }
}
