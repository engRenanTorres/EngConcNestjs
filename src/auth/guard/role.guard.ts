import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../users/models/role.enum';
import { verify, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const authHeader = context.switchToHttp().getRequest().get('authorization');
    if (!authHeader)
      throw new BadRequestException('Missing authorization token');
    const tokenPayload = process.env.TOKEN_KEY;
    if (!tokenPayload) throw new Error('Token key is not set');

    const token = authHeader.slice(7);
    let userData: JwtPayload;
    verify(token, tokenPayload, (error: unknown, decode: JwtPayload) => {
      if (typeof decode === 'object') {
        userData = decode;
      }
    });

    //verifica se a autoridade de acesso do usuário
    if (userData) return requiredRoles.some((role) => userData.role === role);
    return false;
  }
}
