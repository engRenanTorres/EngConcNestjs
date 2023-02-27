import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth/auth.service';
import { MessagesHelper } from '../helpers/message.helper';
import { UnauthorizedError } from '../common/errors/types/UnauthorizedError';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, senha: string) {
    const user = await this.authService.validateUser(email, senha);
    if (!user) throw new UnauthorizedError(MessagesHelper.PASSWORD_CHECK);
    return user;
  }
}
