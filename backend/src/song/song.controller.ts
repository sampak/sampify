import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Users } from 'src/entities/user.entity';
import { CurrentUser } from 'src/user/CurrentUser.decorator';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('/')
  async getAll(@CurrentUser() user: Users, @Res() res) {
    return res.status(HttpStatus.OK).send(await this.songService.getAll(user));
  }

  @Get('/liked')
  async getLiked(@CurrentUser() user: Users, @Res() res) {
    return res
      .status(HttpStatus.OK)
      .send(await this.songService.getLiked(user));
  }

  @Get('/:guid')
  async get(@Res() res) {
    return res.status(HttpStatus.OK).send('a');
  }

  @Post('/liked/:songGuid')
  async InsertLiked(
    @CurrentUser() user: Users,
    @Res() res,
    @Param('songGuid') songGuid: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .send(await this.songService.insertLiked(user, songGuid));
  }

  @Delete('/liked/:guid')
  async DeleteLiked(
    @CurrentUser() user: Users,
    @Res() res,
    @Param('guid') guid: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .send(await this.songService.deleteLiked(user, guid));
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async insert(@Res() res, @UploadedFile() file) {
    if (!file || !file.originalname || file.originalname.length === 0) {
      return res.status(HttpStatus.BAD_REQUEST).send('File is corrupted');
    }
    const result = await this.songService.insert(file);
    if (result === false) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal Server error');
    }
    return res.status(HttpStatus.OK).send(result);
  }
}
