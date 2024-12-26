import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { MongoDBUserRepository } from './infrastructure/repositories/mongodb-user.repository';
import { UserSchema } from './infrastructure/schemas/user.schema';

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