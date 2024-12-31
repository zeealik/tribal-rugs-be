import { IsNotEmpty, IsNumber, IsString, IsArray, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DimensionsDto {
  @IsNumber()
  @Min(0)
  width: number;

  @IsNumber()
  @Min(0)
  length: number;

  @IsString()
  unit: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  manufacturing: string;

  @IsString()
  origin: string;

  @IsString()
  material: string;

  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions: DimensionsDto;

  @IsNumber()
  @Min(0)
  ageInYears: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  details: string;

  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
