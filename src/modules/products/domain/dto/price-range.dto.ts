import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class PriceRangeDto {
  @IsNumber()
  @Type(() => Number)
  min: number;

  @IsNumber()
  @Type(() => Number)
  max: number;
}