import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { SigninUserService } from './signinUser.service';

@Controller('users/signin')
export class SigninUserController {
  constructor(private signinUserService: SigninUserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() data) {
    const { email, password } = data;
    console.log(`EMAIL: ${email}, PASSWORD: ${password}`);
    const tokens = await this.signinUserService.signin(email, password);
    return instanceToInstance(tokens);
  }
}
