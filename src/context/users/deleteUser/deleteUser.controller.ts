import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { DeleteUserService } from './deleteUser.service';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async create(@Query('id') id: string) {
    await this.deleteUserService.delete(id);
  }
}
