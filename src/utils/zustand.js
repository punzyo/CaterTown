import { create } from "zustand";

export const useUserState =  create((set, get) => ({
    user: {
        name: '美樂蒂',
        email: '',
        id: 'melody',
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