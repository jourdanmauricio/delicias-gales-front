import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface IProducts {
  id: string;
  quantity: number;
}

interface State {
  userId: string | null;
  products: IProducts[];
  setProducts: (product: IProducts) => void;
  setUserId: (userId: string) => void;
}

export const useShopCarStore = create<State>()(
  persist(
    (set) => ({
      userId: null,
      products: [],
      setProducts: (product: IProducts) =>
        set((state) => {
          const index = state.products.findIndex(
            (item) => item.id === product.id
          );
          if (index === -1) {
            return { products: [...state.products, product] };
          } else {
            const updatedProducts = state.products.map((item, idx) =>
              idx === index ? { ...item, quantity: product.quantity } : item
            );
            return { products: updatedProducts };
          }
        }),
      setUserId: (userId: string) => set({ userId }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
