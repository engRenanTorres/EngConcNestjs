import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from '../create-question.dto';

//PartialTypes copia os mesmo campos da classe referenciada, mas deixa os campos como opcionais
export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
