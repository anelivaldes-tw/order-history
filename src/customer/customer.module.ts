import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventHandlerService } from '../event-handler/event-handler.service';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import {
  OrderHistory,
  OrderHistorySchema,
} from './schemas/order-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: OrderHistory.name, schema: OrderHistorySchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, EventHandlerService],
})
export class CustomerModule {}
