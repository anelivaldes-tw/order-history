import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop()
  customerId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  creditLimit: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
