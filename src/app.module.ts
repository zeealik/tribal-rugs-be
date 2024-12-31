import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './shared/config/mongo.config';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.uri),
    UsersModule,
    AuthModule,
    ProductsModule
  ]
})
export class AppModule {}