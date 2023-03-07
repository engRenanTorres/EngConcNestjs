import { Document } from 'mongoose';
import { Role } from '../models/role.enum';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  roles: Role;
  createdAt: number;
  lastUpdateAt: number;
}
