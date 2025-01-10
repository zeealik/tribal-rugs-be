
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  password: String,
  name: String,
  age: Number,
  phoneNumber: String,
  role: String,
  address: String,
  createdAt: Date
});

