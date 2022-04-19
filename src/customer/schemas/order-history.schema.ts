import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderHistoryDocument = OrderHistory & Document;

@Schema()
export class OrderHistory {
  @Prop()
  customerId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  creditLimit: number;

  @Prop()
  orders: [{ orderId: string; state: string; orderTotal: number }];
}

export const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);
