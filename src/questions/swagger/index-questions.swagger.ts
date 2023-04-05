import { ApiProperty } from '@nestjs/swagger';
import { Answer, Choices } from '../models/question.model';

export class IndexQuestionsSwagger {
  _id: string;
  @ApiProperty()
  text: string;
  @ApiProperty()
  choices: Choices;
  @ApiProperty()
  answer: Answer;
  @ApiProperty()
  lastUpdateAt: number;
  @ApiProperty()
  createdAt: number;
}

export class InvalidAnswerResponse {
  @ApiProperty()
  statusCode: 400;
  @ApiProperty()
  message: [
    'O campo answer aceita apenas os resultados a, b, c, d, e, verdadeiro, falso',
  ];
  @ApiProperty()
  error: 'Bad Request';
}
