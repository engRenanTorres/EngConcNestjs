import { Controller, UseGuards, Post, HttpStatus } from '@nestjs/common';
import { Body, HttpCode, Req } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SigninDTO } from '../users/dto/signin.dto';
import { User } from '../users/models/user.model';
import { ApiTags } from '@nestjs/swagger';

interface ReqLocal extends Request {
  user: User;
}

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() signinDTO: SigninDTO,
    @Req() req: ReqLocal,
  ): Promise<object> {
    return await this.authService.login(req.user);
  }
}
