import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { ProductStatus } from '@/utils/types/products/productStatus.enun';
import { Actions } from '@/utils/types/tables/actions.enum';
import { initialProd } from '@/utils/constants';
import { IProduct } from '@/utils/constants/products/IProduct';


interface State {
  product: IProduct | null;
  action: Actions;
  setProduct: (product: IProduct) => void;
  updProduct: (name: keyof IProduct, value: any[]) => void;
  setAction: (action: Actions) => void;
}

export const useProductStore = create<State>()(persist((set) => ({
      product: initialProd, 
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
        {
        console.log("updProduct", name, value)
        return set((state) => ({
          product: {
            ...state.product,
            [name]: value,
          },
        }))},
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