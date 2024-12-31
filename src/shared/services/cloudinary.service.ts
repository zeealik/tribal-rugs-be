// cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:.]/g, ''); 
      const publicId = `rug-${timestamp}`; // Custom name for the image
      const tag = `${now.toLocaleString('default', { month: 'long' })}-${now.getFullYear()}`; // e.g., December-2024

      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          public_id: publicId, 
          folder: 'rugs', 
          tags: [tag] // Add the generated tag
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}