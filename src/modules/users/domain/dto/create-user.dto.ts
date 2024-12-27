import { IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  age: number;
}