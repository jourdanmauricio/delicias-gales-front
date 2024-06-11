import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { IUser } from '@/utils/types/users/IUser';


interface State {
  user: IUser;
  setUser: (user: IUser) => void;
}

export const useUserStore = create<State>()(persist((set) => ({
  user: null,
  setUser: (user) => set({
    user
  }),
}), {
  name: 'user',
  storage: createJSONStorage(() => sessionStorage)
}))