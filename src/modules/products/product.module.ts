import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBProductRepository } from './domain/repositories/mongo-db-product.repository';
import { ProductSchema } from './infrastructure/schemas/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
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