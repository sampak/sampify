import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Requests } from 'src/entities/request.entity';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Requests)
    private readonly requestsRepository: Repository<Requests>,
  ) {}

  async request(guid: string, currentUser: Users) {
    if (!currentUser || !currentUser.guid) {
      throw new HttpException('You are not logged!', HttpStatus.FORBIDDEN);
    }

    try {
      const saveData = {
        userGuid: currentUser.guid,
        songGuid: guid,
        expiresIn: moment().add(10, 'minutes').format(),
      };

      return await this.requestsRepository.save(saveData);
    } catch (e) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get(guid: string): Promise<Requests> {
    if (!guid) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const request = await this.requestsRepository.findOne({ guid });

    if (!request) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (moment(request.expiresIn).isBefore(moment())) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return request;
  }
}
