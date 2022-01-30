import { IsString, IsNotEmpty } from 'class-validator';

export class userAuthDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
