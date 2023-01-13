import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { MessagesHelper } from 'src/helpers/message.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, senha: string) {
    const user = await this.authService.validateUser(login, senha);
    if (!user) throw new UnauthorizedException(MessagesHelper.PASSWORD_CHECK);
    return user;
  }
}