import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { User } from '../users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<{ token: string }> {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
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
}
