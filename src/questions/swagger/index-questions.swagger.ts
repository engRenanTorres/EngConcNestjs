import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '../models/question.model';

export class IndexQuestionsSwagger {
  _id: string;
  @ApiProperty()
  text: string;
  @ApiProperty()
  tip: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  choices: string[];
  @ApiProperty()
  answer: Answer;
  @ApiProperty()
  lastUpdateAt: number;
  @ApiProperty()
  createdAt: number;
  @ApiProperty()
  author: string;
  @ApiProperty()
  institute: string;
}

export class InvalidAnswerResponse {
  @ApiProperty()
  statusCode: 400;
  @ApiProperty()
  message: ["The answer's field acepts only a, b, c, d, e, Correta, Errada."];
  @ApiProperty()
  error: 'Bad Request';
}
