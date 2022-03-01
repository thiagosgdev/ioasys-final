import envConfig from 'src/config/env';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepo } from 'src/modules/users/repository/user.repository';

@Injectable()
export class EnsureUserLoggedMiddleware implements NestMiddleware {
  constructor(private userRepository: UserRepo) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization;
      token = token.split(' ')[1];
      verify(token, envConfig().jwtSecret, async (err, payload) => {
        if (!err) {
          const id = String(payload.sub);
          const user = await this.userRepository.findById(id);
          if (!user || user.token != token) {
            return res.status(403).json({ message: 'User not authenticated!' });
          }
          res.locals.user = id;
          next();
        } else {
          return res.status(403).json({ message: 'User not authenticated!' });
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
