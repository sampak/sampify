import { Controller, Get, StreamableFile, Response, Request, Param } from '@nestjs/common';
import * as fs from 'fs';
// import { join } from 'path';

interface MusicList {
  id: number;
  raw: string;
}

const mockedList: MusicList[] = [
  {id: 1, raw: 'public/Zarzycki-Czarna-woda.mp3'},
  {id: 2, raw: 'public/Era-Istrefi-Bonbon(English Version Cover Art).mp3'},
]

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Get('/music/:id')
  async getMusic(@Request() req, @Response() res, @Param('id') musicId): Promise<any> {
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const range = req.headers.range;
    console.log('requested range: ', range);
    if(!range) return res.status(400).send('Requires Range header');
    const musicPath = mockedList.find((music: MusicList) => music.id === parseInt(musicId) ).raw;
    if(!musicPath) return res.status(400).send('Music not found');
    const soundSize = fs.statSync(musicPath).size;

    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, soundSize - 1);
    const contentLength = end - start + 1;


    
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${soundSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Size": soundSize,
      "Content-Type": "video/mpeg",
    };

    console.log(` ${start}-${end}/${soundSize}`);


    res.writeHead(206, headers);
    const soundStream = fs.createReadStream(musicPath, { start, end });
    console.log('sended');
    return soundStream.pipe(res);
  }


  // @Get('/music')
  // getMusic(@Response() res): any {
  //   console.log('create read stream');
  //   const file = createReadStream(join(process.cwd(), 'public/Zarzycki-Czarna-woda.mp3'));
  //   console.log(file);
  //   res.set({
  //     'Content-Type': 'audio/mpeg',
  //     'Content-Disposition': 'audio; filename="Zarzycki-Czarna-woda.mp3"',
  //   });
  //   // return new StreamableFile(file);
  //   return res.status(200).send(new StreamableFile(file));
  // }
}
