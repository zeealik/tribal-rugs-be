export class Product {
  _id?: string;
  name: string;
  manufacturing: string;
  origin: string;
  material: string;
  colors: string[];
  dimensions: {
    width: number;
    length: number;
    unit: string;
  };
  ageInYears: number;
  price: number;
  quantity: number;
  details: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}
