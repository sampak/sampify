import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Liked_Songs } from 'src/entities/liked.entity';
import { Songs } from 'src/entities/song.entity';
import { Users } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SongController } from './song.controller';
import { SongService } from './song.service';
@Module({
  imports: [TypeOrmModule.forFeature([Songs, User_Liked_Songs, Users])],
  controllers: [SongController],
  providers: [SongService, UserService],
})
export class SongModule {}
