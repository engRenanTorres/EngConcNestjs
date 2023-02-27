import { Role } from 'src/users/models/role.enum';

export interface TokenPayload {
  sub: string;
  email: string;
  role: Role;
}
