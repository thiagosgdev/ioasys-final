import envConfig from 'src/config/env';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class EnsureUserLoggedMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization;
      token = token.split(' ')[1];
      verify(token, envConfig().jwtSecret, async (err, payload) => {
        if (!err) {
          const id = String(payload.sub);
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
