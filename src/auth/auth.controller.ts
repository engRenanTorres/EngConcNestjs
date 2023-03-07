import { Controller, UseGuards, Post, HttpStatus } from '@nestjs/common';
import { Body, HttpCode, Req } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SigninDTO } from '../users/dto/signin.dto';
import { User } from '../users/models/user.model';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

interface ReqLocal extends Request {
  user: User;
}

class LoginResponse {
  @ApiProperty()
  token: string;
}

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Responsável por emitir o token para logar nas api.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: LoginResponse,
  })
  async login(
    @Body() signinDTO: SigninDTO,
    @Req() req: ReqLocal,
  ): Promise<object> {
    return await this.authService.login(req.user);
  }
}
