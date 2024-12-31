// src/modules/products/product.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ConflictException, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { CreateProductDto } from './domain/dto/create-product.dto';
import { Product } from './domain/entities/product.entity';
import { ProductService } from './product.service';
import { PriceRangeDto } from './domain/dto/price-range.dto';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

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

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return { url: imageUrl };
  }

  @Post('upload-images')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new Error('No files were uploaded');
    }
    const uploadedUrls = await this.cloudinaryService.uploadImages(files);
    return { urls: uploadedUrls };
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