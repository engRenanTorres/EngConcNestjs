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
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateDefaltUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { Patch, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/roles.decorator';
import { Role } from './models/role.enum';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  IndexUsersSwagger,
  UserFindSwagger,
  InvalidPasswordResponse,
} from './swagger/index-users.swagger';
import { UsersMsgSwagger } from './swagger/swagger-messages.helper';
import { MessagesHelper } from '../helpers/message.helper';

@Controller('api/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt') //Without this decorator in every method, Swagger won't send the auth header.
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @Roles(Role.ADM, Role.STAF)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: UsersMsgSwagger.ALL_SUMMARY })
  @ApiResponse({
    status: 200,
    description: UsersMsgSwagger.ALL_200,
    type: UserFindSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: MessagesHelper.ACCESS_DENIED,
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @Roles(Role.ADM, Role.STAF)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: UsersMsgSwagger.FIND_USER_SUMMARY })
  @ApiResponse({
    status: 200,
    description: UsersMsgSwagger.FIND_USER_200,
    type: IndexUsersSwagger,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MessagesHelper.ACCESS_DENIED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UsersMsgSwagger.USER_NOT_FOUND,
  })
  findById(@Param('id') id: string): Promise<User> | HttpException {
    const user = this.usersService.findById(id);
    return user;
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: UsersMsgSwagger.CREATE_SUMMARY })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: UsersMsgSwagger.CREATE_200,
    type: IndexUsersSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: UsersMsgSwagger.CREATE_400,
    type: InvalidPasswordResponse,
  })
  @ApiResponse({ status: 409, description: UsersMsgSwagger.CREATE_409 })
  create(@Body() body: CreateDefaltUserDto): Promise<User> | HttpException {
    return this.usersService.create(body);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @Roles(Role.ADM)
  @ApiOperation({ summary: UsersMsgSwagger.UPDATE_SUMMARY })
  @ApiResponse({ status: 200, description: UsersMsgSwagger.UPDATE_200 })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UsersMsgSwagger.USER_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MessagesHelper.ACCESS_DENIED,
  })
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> | HttpException {
    return this.usersService.update(id, body);
  }

  @Delete(':email')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @Roles(Role.ADM)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: UsersMsgSwagger.REMOVE_SUMMARY })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: UsersMsgSwagger.REMOVE_200,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UsersMsgSwagger.USER_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MessagesHelper.ACCESS_DENIED,
  })
  async remove(@Param('email') email: string) {
    return await this.usersService.delete(email);
  }
}
