import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReceiverDocument = Receiver & Document;

@Schema()
export class Receiver {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ type: Object })
  eligibility: {
    A_positive: boolean;
    A_negative: boolean;
    B_positive: boolean;
    B_negative: boolean;
    O_positive: boolean;
    O_negative: boolean;
    AB_positive: boolean;
    AB_negative: boolean;
  };

  @Prop()
  email: string;

  @Prop()
  phone: string;
}

export const ReceiverSchema = SchemaFactory.createForClass(Receiver);
