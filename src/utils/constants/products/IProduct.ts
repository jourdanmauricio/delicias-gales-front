import { ProductStatus } from '@/utils/types/products/productStatus.enun';

export interface IProduct {
  id: string;
  name: string;
  brandId: string;
  cod: string;
  description: string;
  maxQuantity: number;
  minQuantity: number;
  originalPrice: number;
  categoriesIds: any[];
  retailPrice: number;
  sku: string;
  status: ProductStatus;
  stock: number;
  thumbnail: string;
  wholesalePrice: number;
}