import { Document } from 'mongoose';
import { User } from '../../users/models/user.model';

export interface Question extends Document {
  _id?: string;
  text: string;
  answer: Answer;
  choices?: Choices;
  author?: User;
  createdAt: number;
  lastUpdateAt?: number;
}

export type Answer = 'a' | 'b' | 'c' | 'd' | 'e' | 'verdadeiro' | 'falso';

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

export type Choices = MultipleChoices;

export type MultipleChoices = {
  types: 'multiple' | 'truefalse';
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  e?: string;
};
