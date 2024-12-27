import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { User } from './domain/entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './domain/dto/create-user.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard) // Apply guard to this route
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Apply guard to this route -- use middleware instead
  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Post() // No guard, making it public
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard) // Apply guard to this route
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<User>): Promise<User> {
    return this.userService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard) // Apply guard to this route
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
