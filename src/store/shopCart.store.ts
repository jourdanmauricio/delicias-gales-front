import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { IProdCart } from '@/utils/types/products/IProdCart';

interface State {
  userId: string | null;
  products: IProdCart[];
  setProducts: (product: IProdCart) => void;
  setUserId: (userId: string) => void;
}

export const useShopCartStore = create<State>()(
  persist(
    (set, get) => ({
      userId: null,
      products: [],
      setProducts: (product: IProdCart) =>
        set((state) => {
          const index = state.products.findIndex(
            (item) => item.id === product.id
          );

          if (index === -1) {
            return ({ products: [...state.products, product] });
          } 
          
          if (product.quantity === 0) {
            const updatedProducts = state.products.filter((prod) =>
              prod.id !== product.id);
            console.log("Delete product",updatedProducts )
          return ({ products: updatedProducts });  
          }
            
          const updatedProducts = state.products.map((prod) =>
              prod.id === product.id ? { ...prod, quantity: product.quantity } : prod
            );
          return ({ products: updatedProducts });

        }),
      setUserId: (userId: string) => set({ userId }),
    }),
    {
      name: "shopCart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
