import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
  Response,
} from '@nestjs/common';
import { Request } from 'express';
import { instanceToInstance } from 'class-transformer';
import { UpdateUserDTO } from 'src/shared/dtos/updateUser.dto';
import { UpdateUserService } from './updateUser.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/shared/entities/user.entity';
import { UserResponseDTO } from 'src/shared/dtos/user/userResponse.dto';

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
  public async create(
    @Body() updateUserRequestBody: UpdateUserDTO,
    @Response() res,
  ): Promise<User> {
    const id = res.locals.user;
    if (!id) {
      throw new HttpException(
        'User not authenticated!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.updateUserService.update(id, updateUserRequestBody);
    const teste = instanceToInstance(user);
    return res.send(teste);
  }
}
