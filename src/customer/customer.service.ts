import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly orderModel: Model<CustomerDocument>,
  ) {}

  async create(customerEvent): Promise<Customer> {
    return await this.orderModel.create(customerEvent);
  }
}
