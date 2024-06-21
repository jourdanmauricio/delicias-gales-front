import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { ProductStatus } from '@/utils/types/products/productStatus.enun';
import { Actions } from '@/utils/types/tables/actions.enum';

interface IProduct {
  id: string;
  cod: string;
  description: string;
  maxQuantity: number;
  minQuantity: number;
  name: string;
  originalPrice: number;
  prodCategories: any[];
  retailPrice: number;
  sku: string;
  status: ProductStatus;
  stock: number;
  thumbnail: string;
  wholesalePrice: number;
}

interface State {
  product: IProduct | null;
  action: Actions;
  setProduct: (product: IProduct) => void;
  updProduct: (name: keyof IProduct, value: string) => void;
  setAction: (action: Actions) => void;
}

export const useProductStore = create<State>()(persist((set) => ({
      product: null, 
      action: Actions.VIEW,
      setProduct: (product: IProduct) =>
        set((state) => {
          console.log("SET PRODUCT", product)
          return ({
          ...state,
          product,
          })
        }),
      updProduct: (name: keyof IProduct, value: any) =>
        set((state) => ({
          product: {
            ...state.product,
            [name]: value,
          },
        })),
      setAction: (action: Actions) =>
        set((state) => {
          console.log("SET ACTION", action)
          return ({
          ...state,
          action,
        })}),
    }),{
  name: 'product',
  storage: createJSONStorage(() => localStorage)
}))