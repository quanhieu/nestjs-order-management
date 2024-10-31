import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: Types.ObjectId, required: true, unique: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop()
  // e.g., "Electronics", "Apparel", "Books"
  category: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
