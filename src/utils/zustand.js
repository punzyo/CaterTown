import { create } from "zustand";

export const useUserState =  create((set, get) => ({
    user: {
        name: '林以理',
        email: '',
        id: 'yili',
      },
      setUser: (userData) =>
        set((state) => ({
          ...state,
          user: { ...state.user, ...userData },
        })),
      resetUser: () =>
        set({
          user: {
            name: '',
            email: '',
            id: '',
          },
        }),
      getUserData: () => get().user,
}));