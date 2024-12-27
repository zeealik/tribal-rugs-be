import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBUserRepository } from './infrastructure/repositories/mongodb-user.repository';
import { UserSchema } from './infrastructure/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: MongoDBUserRepository
    }
  ],
  exports: [UserService] // Export for use in other modules
})
export class UsersModule {}