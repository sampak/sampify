import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Songs } from 'src/entities/song.entity';
import { Repository } from 'typeorm';
import * as getMP3Duration from 'get-mp3-duration';
import * as fs from 'fs';
@Injectable()
export class SongService {

  constructor(
    @InjectRepository(Songs)
    private readonly songRepository: Repository<Songs>
  ){}

  async getAll(){
    return await this.songRepository.find();
  }


  async insert(file){
    const splittedName = file.originalname.split('.');
    const fileName = splittedName[0] ?? file.originalname;
    const fileType = splittedName[splittedName.length - 1] ?? 'mp3';
    const duration = await getMP3Duration(file.buffer);
    try {
    const songInsert = this.songRepository.create();
    songInsert.title = fileName;
    songInsert.duration = duration;
    const result = await this.songRepository.save(songInsert);
    if(!result.guid){
      console.error('Insert failed [2]', result);
      return false;
    } 
    try {
      await fs.mkdirSync(`public/${result.guid}`); 
      await fs.writeFileSync(`public/${result.guid}/raw.${fileType}`, file.buffer) // Add checking file type
      return result;
    } catch(e) {
      console.error('folder creation failed');
      this.songRepository.delete({guid: result.guid});
      return false;
    }
    } catch(e) {
      console.error('Insert failed');
      return false;
    }
  }

}
