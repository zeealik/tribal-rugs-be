// src/modules/shared/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from '../config/cloudinary.config';
import { CloudinaryService } from '../services/cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}