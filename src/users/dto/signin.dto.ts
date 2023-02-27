import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly password: string;
}
