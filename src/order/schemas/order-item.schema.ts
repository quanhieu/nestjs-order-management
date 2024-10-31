import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class OrderItem extends Document {
  @Prop({ type: Types.ObjectId, required: true, unique: true })
  itemId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Order' })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Product' })
  productId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  totalPrice: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
