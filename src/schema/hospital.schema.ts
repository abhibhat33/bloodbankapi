import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type HospitalDocument = Hospital & Document;

@Schema()
export class Hospital {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  phone: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({
    type: [
      {
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Receiver' },
        bloodGroup: { type: String, required: true },
        requestedAt: { type: Date, required: true },
      },
    ],
    default: [],
  })
  requests: {
    toJSON(): any;
    receiver: mongoose.Schema.Types.ObjectId,
    bloodGroup: string,
    requestedAt: Date,
  }[];

}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
