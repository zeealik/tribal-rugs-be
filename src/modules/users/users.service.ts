import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = []; // Temporary in-memory storage

  async createUser(createUserDto: CreateUserDto) {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  async deleteUser(userId: number) {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      return { message: 'User deleted successfully' };
    }
    return { message: 'User not found' };
  }
}
