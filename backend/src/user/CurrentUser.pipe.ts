// parse-token.pipe.ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from './user.service';
import * as jwt from 'jsonwebtoken';
import config from '../config';
const env = process.env.NODE_ENV || 'development';
@Injectable()
export class CurrentUserPipe implements PipeTransform {
    // inject any dependency
    constructor(private userService: UserService) {}
    
    async transform(token: string, metadata: ArgumentMetadata) {
      if(!token){
        return null;
      }

      const access_token = token.replace('Bearer ', '');
      const { guid } = await jwt.verify(access_token, config[env].JWT_SECRET);
      const user = await this.userService.findOne(guid);
      return user;
        // console.log('additional options', metadata.data);
        // return this.authService.parse(value);
    }
}