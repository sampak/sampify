import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Songs } from 'src/entities/song.entity';
import { SongController } from './song.controller';
import { SongService } from './song.service';
@Module({
  imports: [TypeOrmModule.forFeature([Songs])],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
