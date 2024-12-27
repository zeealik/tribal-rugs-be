import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class MongoDBUserRepository implements IUserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) { }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel({
      ...user,
      createdAt: new Date()
    });
    return newUser.save();
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}