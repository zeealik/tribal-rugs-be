
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ConflictException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CreateProductDto } from './domain/dto/create-product.dto';
import { Product } from './domain/entities/product.entity';
import { ProductService } from './product.service';
import { PriceRangeDto } from './domain/dto/price-range.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('origin/:origin')
  findByOrigin(@Param('origin') origin: string): Promise<Product[]> {
    return this.productService.findByOrigin(origin);
  }

  @Get('price-range')
  findByPriceRange(@Query() priceRange: PriceRangeDto): Promise<Product[]> {
    return this.productService.findByPriceRange(priceRange.min, priceRange.max);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productService.findByName(createProductDto.name);
    if (existingProduct) {
      throw new ConflictException(`A product with the name "${createProductDto.name}" already exists.`);
    }
    return this.productService.create(createProductDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(id, updateData);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.productService.delete(id);
    return { message: `Product with ID "${id}" has been successfully deleted.` };
  }
}