import { ApiProperty, OmitType } from '@nestjs/swagger';

export class IndexUsersSwagger {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  roles: number;
}

export class UserFindSwagger extends OmitType(IndexUsersSwagger, [
  'password',
]) {}

export class InvalidPasswordResponse {
  @ApiProperty()
  statusCode: 400;
  @ApiProperty()
  message: [
    'A senha deve conter letras minúsculas e maiúsculas, números, caracters especiais e ser maior que 6 dígitos.',
  ];
  @ApiProperty()
  error: 'Bad Request';
}
