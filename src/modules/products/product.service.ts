import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './domain/dto/create-product.dto';
import { Product } from './domain/entities/product.entity';
import { IProductRepository } from './domain/repositories/product.repository.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.create({
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async update(id: string, updateData: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.update(id, {
      ...updateData,
      updatedAt: new Date()
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.productRepository.delete(id);
  }

  async findByOrigin(origin: string): Promise<Product[]> {
    return this.productRepository.findByOrigin(origin);
  }

  async findByPriceRange(min: number, max: number): Promise<Product[]> {
    return this.productRepository.findByPriceRange(min, max);
  }

  async findByName(name: string): Promise<Product | null> {
    return this.productRepository.findByName(name);
  }
}