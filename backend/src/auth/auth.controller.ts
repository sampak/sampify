import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userAuthDto } from './userAuth.dto';
import { userInsertDto } from './userInsert.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ){}

  @Post('/login')
  async Auth(@Res() res, @Body() user: userAuthDto){
    res.status(HttpStatus.OK).send(await this.authService.auth(user))
  }

  @Post('/register')
  async Register(@Res() res, @Body() user: userInsertDto){
    let User = await this.authService.insert(user);
    delete User.password;
    res.status(HttpStatus.OK).send(User);
  }

}
