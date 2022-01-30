import { IsString, IsNotEmpty } from 'class-validator';

export class SongInsertDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
