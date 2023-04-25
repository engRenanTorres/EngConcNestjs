import {
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
import { InstitutesService } from './institutes.service';
import { Institute } from './models/institute.model';
import { CreateDefaltInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto/update-institute.dto';
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
  IndexInstitutesSwagger,
  InstituteFindSwagger,
  InvalidPasswordResponse,
} from './swagger/index-institutes.swagger';
import { InstitutesMsgSwagger } from './swagger/swagger-messages.helper';
import { MessagesHelper } from '../helpers/message.helper';

@Controller('api/institutes')
@ApiTags('Institutes')
export class InstitutesController {
  constructor(private readonly institutesService: InstitutesService) {}
  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: InstitutesMsgSwagger.ALL_SUMMARY })
  @ApiResponse({
    status: 200,
    description: InstitutesMsgSwagger.ALL_200,
    type: InstituteFindSwagger,
    isArray: true,
  })
  findAll(): Promise<Institute[]> {
    return this.institutesService.findAll();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: InstitutesMsgSwagger.FIND_INSTITUTE_SUMMARY })
  @ApiResponse({
    status: 200,
    description: InstitutesMsgSwagger.FIND_INSTITUTE_200,
    type: IndexInstitutesSwagger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: InstitutesMsgSwagger.INSTITUTE_NOT_FOUND,
  })
  findById(@Param('id') id: string): Promise<Institute> | HttpException {
    const institute = this.institutesService.findById(id);
    return institute;
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @Roles(Role.ADM)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: InstitutesMsgSwagger.CREATE_SUMMARY })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: InstitutesMsgSwagger.CREATE_200,
    type: IndexInstitutesSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: InstitutesMsgSwagger.CREATE_400,
    type: InvalidPasswordResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MessagesHelper.ACCESS_DENIED,
  })
  @ApiResponse({ status: 409, description: InstitutesMsgSwagger.CREATE_409 })
  create(
    @Body() body: CreateDefaltInstituteDto,
  ): Promise<Institute> | HttpException {
    return this.institutesService.create(body);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @Roles(Role.ADM)
  @ApiOperation({ summary: InstitutesMsgSwagger.UPDATE_SUMMARY })
  @ApiResponse({ status: 200, description: InstitutesMsgSwagger.UPDATE_200 })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: InstitutesMsgSwagger.INSTITUTE_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MessagesHelper.ACCESS_DENIED,
  })
  update(
    @Param('id') id: string,
    @Body() body: UpdateInstituteDto,
  ): Promise<Institute> | HttpException {
    return this.institutesService.update(id, body);
  }

  @Delete(':Name')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @Roles(Role.ADM)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: InstitutesMsgSwagger.REMOVE_SUMMARY })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: InstitutesMsgSwagger.REMOVE_200,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: InstitutesMsgSwagger.INSTITUTE_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MessagesHelper.ACCESS_DENIED,
  })
  async remove(@Param('Name') Name: string) {
    return await this.institutesService.delete(Name);
  }
}
