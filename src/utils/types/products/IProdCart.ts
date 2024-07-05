import { ProductStatus } from '@/utils/types/products/productStatus.enun';

export interface IProdCart {
  id: string;
  name: string;
  thumbnail: string;
  quantity: number;
  // retailPrice: number;
  // wholesalePrice: number;
}