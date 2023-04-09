import { Document } from 'mongoose';

export interface Hospital extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly location: string;
  readonly phone?: string;
  readonly createdAt?: Date;
}
