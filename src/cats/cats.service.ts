import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catModel.create(createCatDto);
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    return await this.catModel.findByIdAndRemove({ _id: id }).exec();
  }
}
