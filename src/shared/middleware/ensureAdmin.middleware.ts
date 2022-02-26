import envConfig from 'src/config/env';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepo } from '../repositories/user.repository';

@Injectable()
export class EnsureAdminMiddleware implements NestMiddleware {
  constructor(private userRepository: UserRepo) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res
          .status(403)
          .json({ message: 'User not authenticated! Inform a Token!' });
      }
      token = token.split(' ')[1];
      verify(token, envConfig().jwtSecret, async (err, payload) => {
        if (!err) {
          const user_id = String(payload.sub);
          const user = await this.userRepository.findById(user_id);
          if (!user.is_admin) {
            throw new Error('Access denied!');
          }
          res.locals.user = user_id;
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
