import { Controller } from '@nestjs/common';

import { EventHandlerService } from '../event-handler/event-handler.service';
import { EventPattern } from '@nestjs/microservices';
import {
  CustomerEvent,
  OrderEvent,
} from '../event-publisher/models/events.model';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(
    private readonly eventHandlerService: EventHandlerService,
    private readonly orderService: OrderService,
  ) {}
  @EventPattern('order')
  async handleOrderEvents(payload: any) {
    this.eventHandlerService.handleEvent('order', payload, async () => {
      const orderEvent: OrderEvent = payload.value;
      await this.orderService.create(orderEvent);
    });
  }
}
