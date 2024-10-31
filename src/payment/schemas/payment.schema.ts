import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base.schema';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment extends BaseSchema {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Order' })
  orderId: Types.ObjectId;

  // @Prop({ type: Types.ObjectId, required: true, ref: 'Customer' })
  // customerId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  // Enum (e.g., "PENDING", "COMPLETED", "FAILED")
  status: string;

  @Prop({ required: true })
  // e.g., "Credit Card", "PayPal", "Google Pay"
  paymentMethod: string;

  @Prop()
  createdAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
