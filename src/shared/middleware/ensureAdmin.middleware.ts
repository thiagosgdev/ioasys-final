import envConfig from 'src/config/env';

import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';

@Injectable()
export class EnsureAdminMiddleware implements NestMiddleware {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
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
          const id = String(payload.sub);
          const user = await this.userRepository.findOne(id);
          if (!user.isAdmin) {
            throw new Error('Access denied!');
          }
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
