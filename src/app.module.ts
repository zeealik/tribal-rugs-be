import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './shared/config/mongo.config';
import { UsersModule } from './modules/users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.uri),
    UsersModule
  ]
})
export class AppModule {}