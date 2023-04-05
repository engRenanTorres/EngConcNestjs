import { Role } from 'src/users/models/role.enum';

export interface TokenPayload {
  sub: string;
  role: Role;
  iat?: number;
  exp?: number;
}
