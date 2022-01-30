import { IsString, IsNumber, IsNotEmpty, IsEmail } from 'class-validator';


export class userAuthDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}