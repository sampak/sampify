import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';
const env = process.env.NODE_ENV || 'development';

@Injectable()
export class authMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization)
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send('You must be authed to use this service');

      const access_token = req.headers.authorization.replace('Bearer ', '');
      await jwt.verify(access_token, config[env].JWT_SECRET);
      next();
    } catch (e) {
      console.log('must be authed [2]');
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send('You must be authed to use this service');
    }
  }
}
