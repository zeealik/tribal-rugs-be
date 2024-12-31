import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  manufacturing: { type: String, required: true },
  origin: { type: String, required: true },
  material: { type: String, required: true },
  colors: [{ type: String }],
  dimensions: {
    width: { type: Number, required: true },
    length: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  ageInYears: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  details: { type: String },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});