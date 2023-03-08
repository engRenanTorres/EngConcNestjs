import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { User } from '../users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './models/jwt-payload.model';
import { ReqHeaders } from './models/req-headers.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<{ token: string }> {
    const payload: TokenPayload = {
      sub: user._id,
      role: user.roles,
    };

    //console.log('user', user);

    return {
      token: this.jwtService.sign(payload, {}),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    let user: User;
    try {
      user = await this.userService.findByEmail(email);
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }

  async validateAccessToken(headers: ReqHeaders) {
    const authHeader = headers.authorization;
    const accessToken = authHeader.slice(7);
    try {
      await this.jwtService.verify(accessToken, {
        publicKey: process.env.TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException(
        'The Authorization Token is not Valid: ' + error.message,
      );
    }
    const decodedToken = this.jwtService.decode(accessToken) as TokenPayload;
    console.log('decodedToken', decodedToken);

    let user: User;
    try {
      user = await this.userService.findById(decodedToken.sub);
    } catch (error) {
      return new UnauthorizedException('Usuário inexistente: ' + error.message);
    }
    const sessionResponseDTO = {
      valid: true,
      credencials: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    };
    return sessionResponseDTO;
  }

  async validateRefreshToken(refreshToken: string) {
    return await this.jwtService.verify(refreshToken);
  }
}
