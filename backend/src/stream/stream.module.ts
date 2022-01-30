import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { authMiddleware } from 'src/auth/auth.middleware';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Requests } from 'src/entities/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Requests])],
  controllers: [StreamController],
  providers: [StreamService, AuthService, UserService],
})
export class StreamModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware)
      .forRoutes({ path: 'stream/request/:guid', method: RequestMethod.GET });
  }
}
