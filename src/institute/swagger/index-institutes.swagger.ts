import { ApiProperty } from '@nestjs/swagger';

export class IndexInstitutesSwagger {
  @ApiProperty()
  name: string;
  @ApiProperty()
  about?: string;
  @ApiProperty()
  website?: string;
  @ApiProperty()
  socialmedia: string;
}

export class InstituteFindSwagger extends IndexInstitutesSwagger {}

export class InvalidPasswordResponse {
  @ApiProperty()
  statusCode: 400;
  @ApiProperty()
  message: [
    'The password must includes Capital letter, lowercase, numbers, special caracters and have at least 6 digits.',
  ];
  @ApiProperty()
  error: 'Bad Request';
}
