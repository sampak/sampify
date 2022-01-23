import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import config from './config';
const env = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    TypeOrmModule.forRoot(config[env].database as any),
    SongModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
