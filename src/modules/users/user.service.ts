// src/modules/users/user.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './domain/entities/user.entity';
import { IUserRepository } from './domain/repositories/user.repository.interface';
import { CreateUserDto } from './domain/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')

    private readonly userRepository: IUserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string, throwError = true): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user && throwError) throw new NotFoundException('User not found');
    return user;
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      createdAt: new Date()
    });
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.update(id, updateData);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.userRepository.delete(id);
  }
}