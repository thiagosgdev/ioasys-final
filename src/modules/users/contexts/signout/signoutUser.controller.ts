import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';

import { Response } from 'express';
import { SignoutUserService } from './signoutUser.service';

@Controller('users/signout')
export class SignoutUserController {
  constructor(private signoutUserService: SignoutUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handle(@Res() res: Response) {
    try {
      const id = res.locals.user;
      if (!id) {
        return res.status(403).send({ message: 'User not authenticated!' });
      }
      const isSignout = await this.signoutUserService.signout(id);
      if (!isSignout) {
        return res
          .status(400)
          .send({ message: 'Bad Request! We couldnt log you out! Try again!' });
      }
      return res.status(200).send({ message: 'User signed out!' });
    } catch (error) {
      return res.status(500).send({ message: 'Internal server error!' });
    }
  }
}
