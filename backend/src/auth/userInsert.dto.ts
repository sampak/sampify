import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class userInsertDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
