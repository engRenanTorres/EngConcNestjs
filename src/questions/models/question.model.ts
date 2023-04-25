import { Document } from 'mongoose';
import { User } from '../../users/models/user.model';
import { Institute } from '../../institute/models/institute.model';

export interface Question extends Document {
  _id?: string;
  text: string;
  answer: Answer;
  choices?: string[];
  tip?: string;
  author: User;
  institute: Institute;
  createdAt: number;
  lastUpdateAt?: number;
}

export type Answer = 'a' | 'b' | 'c' | 'd' | 'e' | 'Correta' | 'Errada';

/*export type ChoicesType = Choices;

export class Choices {
  type: 'multiple' | 'truefalse';
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  e?: string;
  constructor(
    type: 'multiple' | 'truefalse',
    a?: string,
    b?: string,
    c?: string,
    d?: string,
    e?: string,
  ) {
    this.type = type;
    if (type === 'multiple') {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.e = e;
    }
  }
}*/

/*export type Choices = {
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  e?: string;
};*/
