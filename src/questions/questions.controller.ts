import {
  Headers,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './models/question.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto/update-question.dto';
import { Patch, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/models/role.enum';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  IndexQuestionsSwagger,
  InvalidAnswerResponse,
} from './swagger/index-questions.swagger';
import { QuestionsMsgSwagger } from './swagger/swagger-messages.helper';
import { MessagesHelper } from '../helpers/message.helper';
import { ReqHeaders } from '../auth/models/req-headers.model';

//consertar jwt no swagger

@Controller('api/questions')
@ApiTags('Questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: QuestionsMsgSwagger.ALL_SUMMARY })
  @ApiResponse({
    status: 200,
    description: QuestionsMsgSwagger.ALL_200,
    type: IndexQuestionsSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: MessagesHelper.ACCESS_DENIED,
  })
  findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }
  @Get(':id')
  //@UseGuards(AuthGuard('jwt'))
  //@ApiBearerAuth('jwt')
  //@ApiForbiddenResponse({ description: 'Access denied.' })
  //@Roles(Role.ADM, Role.STAF)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: QuestionsMsgSwagger.FIND_QUESTION_SUMMARY })
  @ApiResponse({
    status: 200,
    description: QuestionsMsgSwagger.FIND_QUESTION_200,
    type: IndexQuestionsSwagger,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MessagesHelper.ACCESS_DENIED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: QuestionsMsgSwagger.QUESTION_NOT_FOUND,
  })
  findById(@Param('id') id: string): Promise<Question> | HttpException {
    const question = this.questionsService.findById(id);
    return question;
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt') //Without this decorator in every method, Swagger won't send the auth header.
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @Roles(Role.ADM, Role.STAF)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: QuestionsMsgSwagger.CREATE_SUMMARY })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: QuestionsMsgSwagger.CREATE_200,
    type: IndexQuestionsSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: QuestionsMsgSwagger.CREATE_400,
    type: InvalidAnswerResponse,
  })
  @ApiResponse({ status: 409, description: QuestionsMsgSwagger.CREATE_409 })
  create(
    @Headers() headers: ReqHeaders,
    @Body() body: CreateQuestionDto,
  ): Promise<Question> | HttpException {
    return this.questionsService.create(body, headers);
  }
  @Patch(':id')
  //@UseGuards(AuthGuard('jwt'))
  //@ApiBearerAuth('jwt')
  //@ApiForbiddenResponse({ description: 'Access denied.' })
  //@Roles(Role.ADM)
  @ApiOperation({ summary: QuestionsMsgSwagger.UPDATE_SUMMARY })
  @ApiResponse({ status: 200, description: QuestionsMsgSwagger.UPDATE_200 })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: QuestionsMsgSwagger.QUESTION_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MessagesHelper.ACCESS_DENIED,
  })
  update(
    @Param('id') id: string,
    @Body() body: UpdateQuestionDto,
  ): Promise<Question> | HttpException {
    return this.questionsService.update(id, body);
  }

  @Delete(':id')
  //@UseGuards(AuthGuard('jwt'))
  //@ApiBearerAuth('jwt')
  //@ApiForbiddenResponse({ description: 'Access denied.' })
  //@Roles(Role.ADM)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: QuestionsMsgSwagger.REMOVE_SUMMARY })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: QuestionsMsgSwagger.REMOVE_200,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: QuestionsMsgSwagger.QUESTION_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MessagesHelper.ACCESS_DENIED,
  })
  async remove(@Param('id') id: string) {
    return await this.questionsService.delete(id);
  }
}
