import {
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Res,
  Response,
} from '@nestjs/common';

import { DeleteUserService } from './deleteUser.service';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users/:id')
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async handle(@Res() res) {
    const id = res.locals.user;

    if (!id) {
      return res.status(403).send({ message: 'User not authenticated' });
    }
    await this.deleteUserService.delete(id);
    return res.status(200).send({});
  }
}
