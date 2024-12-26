
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  name: String,
  age: Number,
  createdAt: Date
});
