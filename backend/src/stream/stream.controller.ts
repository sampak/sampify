import {
  Controller,
  Get,
  Response,
  Request,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import * as fs from 'fs';
import { CurrentUser } from 'src/user/currentUser.decorator';
import { Users } from 'src/entities/user.entity';
const CHUNK_SIZE = 10 ** 6; // 1MB to config maybe

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get('/request/:guid')
  async Request(@CurrentUser() user: Users, @Param('guid') guid: string) {
    return await this.streamService.request(guid, user);
  }

  @Get('/:guid')
  async get(@Request() req, @Response() res, @Param('guid') guid) {
    if (!guid) return res.status(HttpStatus.BAD_REQUEST, 'Bad Request');
    const { songGuid } = await this.streamService.get(guid);

    if (!songGuid) return res.status(HttpStatus.BAD_REQUEST, 'Bad Request');

    const range = req.headers.range;
    console.log('requested range: ', range);
    if (!range)
      return res.status(HttpStatus.BAD_REQUEST).send('Requires Range header');
    const musicPath = `public/${songGuid}/raw.mp3`;
    if (!musicPath)
      return res.status(HttpStatus.NOT_FOUND).send('Music not found');
    try {
      const soundSize = fs.statSync(musicPath).size;

      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(start + CHUNK_SIZE, soundSize) - 1;
      const contentLength = end - start + 1;

      const headers = {
        'Content-Range': `bytes ${start}-${end}/${soundSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Size': soundSize,
        'Content-Type': 'audio/mpeg',
      };

      console.log(` ${start}-${end}/${soundSize}`);

      try {
        res.writeHead(206, headers);
        const soundStream = fs.createReadStream(musicPath, { start, end });
        return soundStream.pipe(res);
      } catch (e) {
        console.error('Stream error');
        throw res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Stream error');
      }
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).send('Music not found');
    }
  }
}
