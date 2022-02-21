import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { UpdateUserDTO } from 'src/shared/dto/updateUser.dto';
import { UpdateUserService } from './updateUser.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/shared/entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async create(@Body() updateUserRequestBody: UpdateUserDTO) {
    const user = await this.updateUserService.update(updateUserRequestBody);
    return instanceToInstance(user);
  }
}
