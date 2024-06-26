import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { Actions } from '@/utils/types/tables/actions.enum';
import { initialProd } from '@/utils/constants';
import { IProduct } from '@/utils/constants/products/IProduct';

interface State {
  product: IProduct | null;
  action: Actions;
  fields: string[],
  setProduct: (product: IProduct) => void;
  updProduct: (name: keyof IProduct, value: any[]) => void;
  setAction: (action: Actions) => void;
}

export const useProductStore = create<State>()(persist((set, get) => ({
      product: initialProd, 
      action: Actions.VIEW,
      fields: [],
      setProduct: (product: IProduct) => {
        console.log("SET PRODUCT", product);
        return set(() => (
          {
            product: product,
            fields: []
          }
        )
      )},
      updProduct: (name: keyof IProduct, value: any) =>
        {
        console.log("updProduct", name, value)
        const newFields = get().fields;
        if (!newFields.includes(name)) newFields.push(name);
        return set((state) => ({
          product: {
            ...state.product,
            [name]: value,
          },
          fields: newFields
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