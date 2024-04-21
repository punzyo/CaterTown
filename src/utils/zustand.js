import { create } from "zustand";
import { Track } from "livekit-client";
export const useUserState =  create((set, get) => ({
    user: {
        name: '班尼',
        email: '',
        id: 'benny',
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
export const usePlayerTracks = create((set, get) => ({
  localTracks: [],
  remoteTracks: [],
  nearbyPlayers: [],



  setNearbyPlayers: (players) => set({ nearbyPlayers: players }),
}));