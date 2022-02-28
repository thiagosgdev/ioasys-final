import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { UpdateUserDTO } from 'src/shared/dtos/user/updateUser.dto';
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
  public async handle(
    @Body() updateUserRequestBody: UpdateUserDTO,
    @Res() res,
  ): Promise<Response> {
    try {
      const id = res.locals.user;
      if (!id) {
        return res.status(403).send({ message: 'User not authenticated!' });
      }
      const user = await this.updateUserService.update(
        id,
        updateUserRequestBody,
      );
      if (user) {
        return res.status(200).send(instanceToInstance(user));
      }
      return res.status(404).send({ message: 'User not found!' });
    } catch (error) {
      return res.status(500).send({ message: 'Internal server error!' });
    }
  }
}
