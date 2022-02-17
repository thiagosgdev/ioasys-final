import { Body, Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { FindUserByEmailService } from './findUserByEmail.service';

@Controller('users')
export class FindUserByEmailController {
  constructor(private findUserByEmailService: FindUserByEmailService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async create(@Body('email') email: string) {
    const user = await this.findUserByEmailService.findByEmail(email);
    return instanceToInstance(user);
  }
}
