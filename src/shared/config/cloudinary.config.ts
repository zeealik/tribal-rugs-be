// src/shared/config/cloudinary.config.ts
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dyy95c0se',
      api_key: '873757595162685',
      api_secret: 'sryiRiGrKmOeZ1Bleyo4kSjMoRI'
    });
  },
};