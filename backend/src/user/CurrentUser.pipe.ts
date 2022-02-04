// parse-token.pipe.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as jwt from 'jsonwebtoken';
import config from '../config';
const env = process.env.NODE_ENV || 'development';
@Injectable()
export class CurrentUserPipe implements PipeTransform {
  // inject any dependency
  constructor(private readonly userService: UserService) {}

  async transform(token: string) {
    if (!token) {
      return null;
    }

    try {
      const access_token = token.replace('Bearer ', '');
      const { guid } = await jwt.verify(access_token, config[env].JWT_SECRET);
      const user = await this.userService.findOne(guid);
      return user;
    } catch (e) {
      console.log(e);
      throw new HttpException('You are not logged!', HttpStatus.UNAUTHORIZED);
    }
  }
}
