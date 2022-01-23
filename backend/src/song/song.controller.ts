import { Body, Controller, Get, HttpStatus, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SongService } from './song.service';

@Controller('song')
export class SongController {

  constructor(
    private readonly songService: SongService
  ) {

  }

  @Get('/')
  async getAll(@Res() res){
    return res.status(HttpStatus.OK).send(await this.songService.getAll());
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async insert(@Res() res, @UploadedFile() file){
    if(!file || !file.originalname || file.originalname.length === 0){
      return res.status(HttpStatus.BAD_REQUEST).send('File is corrupted');
    }
    const result = await this.songService.insert(file);
    if(result === false) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server error');
    }
    return res.status(HttpStatus.OK).send('');
  }

}
