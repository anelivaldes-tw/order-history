import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import {
  OrderHistory,
  OrderHistoryDocument,
} from './schemas/order-history.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly orderModel: Model<CustomerDocument>,

    @InjectModel(OrderHistory.name)
    private readonly orderHistoryModel: Model<OrderHistoryDocument>,
  ) {}

  async create(customerEvent): Promise<Customer> {
    return await this.orderModel.create(customerEvent);
  }

  async findOne(id: string) {
    return this.orderHistoryModel.findOne({ customerId: id });
  }
}
