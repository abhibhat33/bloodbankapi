import { Document } from 'mongoose';

export interface Receiver extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly bloodGroup: string;
  readonly phone?: string;
  readonly createdAt?: Date;
}
