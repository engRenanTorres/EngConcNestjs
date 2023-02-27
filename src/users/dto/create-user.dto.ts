import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { MessagesHelper } from '../../helpers/message.helper';
import { RegexHelper } from '../../helpers/regex.helper';
import { Role } from '../models/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: MessagesHelper.USER_NAME_DESCRIPTION })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: MessagesHelper.USER_EMAIL_DESCRIPTION })
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: MessagesHelper.PASSWORD_VALID })
  @Matches(RegexHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  readonly password: string;
  @IsNumber()
  @ApiPropertyOptional({
    description: MessagesHelper.USER_ROLES_DESCRIPTION,
    default: 4,
  })
  readonly roles: Role = 4;
}
