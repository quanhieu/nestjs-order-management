import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ type: Types.ObjectId, required: true, unique: true })
  customerId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({
    type: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
  })
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
