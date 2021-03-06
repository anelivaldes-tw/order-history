import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  orderId: string;

  @Prop()
  customerId: string;

  @Prop()
  state: string;

  @Prop()
  orderTotal: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
