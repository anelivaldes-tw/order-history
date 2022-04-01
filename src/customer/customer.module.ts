import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventHandlerService } from '../event-handler/event-handler.service';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, EventHandlerService],
})
export class CustomerModule {}
