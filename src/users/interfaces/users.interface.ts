import { Document } from 'mongoose';

export interface Users extends Document {
  readonly fullName: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly cPassword:string;
}
