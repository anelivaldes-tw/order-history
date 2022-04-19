import { Controller, Get, Param } from '@nestjs/common';
import { EventHandlerService } from '../event-handler/event-handler.service';
import { EventPattern } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import {
  CustomerEvent,
  CustomerEventTypes,
} from '../event-publisher/models/events.model';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly eventHandlerService: EventHandlerService,
    private readonly customerService: CustomerService,
  ) {}

  @EventPattern('customer')
  async handleCustomerEvents(payload: any) {
    this.eventHandlerService.handleEvent('customer', payload, async () => {
      const customerEvent: CustomerEvent = payload.value;
      if (customerEvent.type === CustomerEventTypes.CUSTOMER_CREATED) {
        await this.customerService.create(customerEvent);
      }
    });
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }
}
