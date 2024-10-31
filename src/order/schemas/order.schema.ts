import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderItem } from './order-item.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Customer' })
  customerId: Types.ObjectId;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  // Enum (e.g., "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELED")
  orderStatus: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }] })
  items?: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
