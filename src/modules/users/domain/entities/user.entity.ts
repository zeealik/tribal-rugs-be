export class User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  age: number;
  address?: string;
  phoneNumber?: string;
  role: string;
  createdAt: Date;
}