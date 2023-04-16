import { IsNotEmpty, IsObject, IsString, Matches } from 'class-validator';
import { MessagesHelper } from '../../helpers/message.helper';
import { RegexHelper } from '../../helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';
import { Choices } from '../models/question.model';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: MessagesHelper.QUESTION_TEXT_DESCRIPTION })
  readonly text: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: MessagesHelper.QUESTION_ANSWER_DESCRIPTION })
  @Matches(RegexHelper.answer, {
    message: MessagesHelper.ANSWER_VALID,
  })
  readonly answer: string;
  @ApiProperty({ description: MessagesHelper.ANSWER_VALID })
  @IsObject()
  readonly choices?: Choices;
  @ApiProperty({ description: MessagesHelper.ANSWER_VALID })
  @IsString()
  readonly author?: string;
}
