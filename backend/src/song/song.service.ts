import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Songs } from 'src/entities/song.entity';
import { Repository } from 'typeorm';
import * as getMP3Duration from 'get-mp3-duration';
import * as fs from 'fs';
import { User_Liked_Songs } from 'src/entities/liked.entity';
@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Songs)
    private readonly songRepository: Repository<Songs>,
    @InjectRepository(User_Liked_Songs)
    private readonly userSongsLikedRepository: Repository<User_Liked_Songs>,
  ) {}

  async getAll(currentUser): Promise<Songs[]> {
    const songs = await this.songRepository.find({
      order: { created_at: 'ASC' },
    });

    for (const song of songs) {
      const liked = await this.userSongsLikedRepository.findOne({
        where: {
          songGuid: song.guid,
          userGuid: currentUser.guid,
        },
      });
      if (!liked) continue;
      song.liked = true;
      song.likedGuid = liked.guid;
    }
    return songs;
  }

  async getLiked(currentUser): Promise<Songs[]> {
    const likedSongs = await this.userSongsLikedRepository.find({
      where: {
        userGuid: currentUser.guid,
      },
      order: { created_at: 'DESC' },
    });

    if (!likedSongs.length) {
      return [];
    }

    const songs: Songs[] = [];

    for (const likedSong of likedSongs) {
      const song = await this.songRepository.findOne({
        guid: likedSong.songGuid,
      });
      if (!song) continue;
      song.liked = true;
      song.likedGuid = likedSong.guid;
      songs.push(song);
    }

    return songs;
  }

  async insertLiked(currentUser, songGuid) {
    if (!songGuid.length)
      throw new HttpException('Song guid is invalid', HttpStatus.BAD_REQUEST);

    const isSong = this.songRepository.find({ guid: songGuid });

    if (!isSong)
      throw new HttpException('Song guid is invalid', HttpStatus.BAD_REQUEST);

    const saveLiked = {
      userGuid: currentUser.guid,
      songGuid: songGuid,
    };

    try {
      return await this.userSongsLikedRepository.save(saveLiked);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteLiked(currentUser, guid) {
    if (!guid.length)
      throw new HttpException('Song guid is invalid', HttpStatus.BAD_REQUEST);
    try {
      return await this.userSongsLikedRepository.delete({
        guid: guid,
        userGuid: currentUser.guid,
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async insert(file): Promise<Songs | boolean> {
    // Rework error handling
    const splittedName = file.originalname.split('.');
    const fileName = splittedName[0] ?? file.originalname;
    const fileType = splittedName[splittedName.length - 1] ?? 'mp3';
    const duration = await getMP3Duration(file.buffer);
    try {
      const saveSong = {
        title: fileName,
        duration: duration,
      };
      const result = await this.songRepository.save(saveSong);
      if (!result.guid) {
        console.error('Insert failed [2]', result);
        return false;
      }
      try {
        await fs.mkdirSync(`public/${result.guid}`);
        await fs.writeFileSync(
          `public/${result.guid}/raw.${fileType}`,
          file.buffer,
        ); // Add checking file type
        return result;
      } catch (e) {
        console.error('folder creation failed');
        this.songRepository.delete({ guid: result.guid });
        return false;
      }
    } catch (e) {
      console.error('Insert failed');
      return false;
    }
  }
}
