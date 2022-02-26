import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  HttpException,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { RefreshUsersTokenService } from './refreshUsersToken.service';

@Controller('users/refreshToken')
export class RefreshUsersTokenController {
  constructor(private refreshUsersTokenService: RefreshUsersTokenService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(@Body('refresh_token') refresh_token: string) {
    const token = await this.refreshUsersTokenService.refresh(refresh_token);
    if (!token) {
      return new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return instanceToInstance(token);
  }
}
