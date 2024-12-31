// src/modules/products/product.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBProductRepository } from './domain/repositories/mongo-db-product.repository';
import { ProductSchema } from './infrastructure/schemas/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryModule } from 'src/shared/modules/cloudinary.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CloudinaryModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'IProductRepository',
      useClass: MongoDBProductRepository
    }
  ],
  exports: [ProductService]
})
export class ProductsModule {}