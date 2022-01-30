import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from './song/song.module';
import { StreamModule } from './stream/stream.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import config from './config';
const env = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    TypeOrmModule.forRoot(config[env].database as any),
    SongModule,
    StreamModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
