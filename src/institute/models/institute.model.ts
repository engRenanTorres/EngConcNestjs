import { Document } from 'mongoose';

export interface Institute extends Document {
  name: string;
  about?: string;
  website?: string;
  socialMedia?: string;
  createdAt: number;
  lastUpdateAt: number;
}
