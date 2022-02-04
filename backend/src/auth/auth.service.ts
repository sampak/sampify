import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { userInsertDto } from './userInsert.dto';
import * as bcrypt from 'bcrypt';
import { userAuthDto } from './userAuth.dto';
import * as jwt from 'jsonwebtoken';
import config from '../config';
const env = process.env.NODE_ENV || 'development';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async auth(
    user: userAuthDto,
  ): Promise<{ access_token: string; expiresIn: string }> {
    const DBUser = await this.usersRepository.findOne({
      select: ['guid', 'login', 'email', 'password', 'verifed'],
      where: [{ login: user.login }, { email: user.login }],
    });

    if (!DBUser) {
      throw new HttpException(
        'Login or password is incorect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!bcrypt.compareSync(user.password, DBUser.password)) {
      throw new HttpException(
        'Login or password is incorect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const jwtSignIn = jwt.sign(
      {
        guid: DBUser.guid,
        login: DBUser.login,
        email: DBUser.email,
        verifed: DBUser.verifed,
      },
      config[env].JWT_SECRET,
      {
        expiresIn: config[env].JWT_EXPIRE_TIME ?? '1h',
      },
    );

    return await {
      access_token: jwtSignIn,
      expiresIn: config[env].JWT_EXPIRE_TIME ?? '1h',
    };
  }

  async insert(user: userInsertDto): Promise<Users> {
    const isUser = await this.usersRepository.findOne({
      where: [{ login: user.login }, { email: user.email }],
    });

    if (isUser) {
      throw new HttpException(
        'Login or E-Mail is taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const saveUser = {
        login: user.login,
        nickname: user.login,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
      };

      console.log(saveUser);
      return await this.usersRepository.save(saveUser);
    } catch (e) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
