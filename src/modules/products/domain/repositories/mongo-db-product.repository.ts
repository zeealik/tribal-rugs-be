import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../entities/product.entity";
import { IProductRepository } from "./product.repository.interface";

@Injectable()
export class MongoDBProductRepository implements IProductRepository {

  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  async findByOrigin(origin: string): Promise<Product[]> {
    return this.productModel.find({ origin }).exec();
  }

  async findByPriceRange(min: number, max: number): Promise<Product[]> {
    return this.productModel.find({ price: { $gte: min, $lte: max } }).exec();
  }
  
  async findByName(name: string): Promise<Product | null> {
    return this.productModel.findOne({ name }).exec();
  }
}