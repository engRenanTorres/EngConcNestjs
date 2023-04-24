import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { MessagesHelper } from '../../helpers/message.helper';
import { RegexHelper } from '../../helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '../models/question.model';

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
  readonly answer: Answer;
  @ApiProperty({ description: MessagesHelper.CHOICES_VALID })
  @IsArray()
  @ArrayMaxSize(5)
  readonly choices: string[];
  @ApiProperty({ description: MessagesHelper.ANSWER_VALID })
  @IsString()
  readonly author?: string;
  @ApiProperty({
    description: MessagesHelper.TIP_DESCRIPTION,
  })
  @IsString()
  readonly tip?: string;
  @ApiProperty({
    description: MessagesHelper.YEAR_DESCRIPTION,
  })
  @IsInt()
  @Max(new Date().getFullYear())
  @Min(2010)
  readonly year: number;
}
