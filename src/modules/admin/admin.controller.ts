import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  @Get()
  findAll() {
    return 'This route is accessible only by admins!';
  }
}
