import { create } from 'zustand';
import { Track } from 'livekit-client';
export const useUserState = create((set, get) => ({
  user: {
    name: '',
    email: '',
    id: '',
  },
  setUser: (userData) =>
    set((state) => ({
      ...state,
      user: { ...state.user, ...userData },
    })),
  resetUser: () => {
    localStorage.removeItem('ChouChouZooUser');
    set({
      user: {
        name: '',
        email: '',
        id: '',
      },
    });
  },
  getUserData: () => get().user,
}));
export const usePullRequests = create((set, get) => ({
  showPullRequests: false,
  prGitHubId: '',
  pullRequests: [],

  setPrGitHubId: (prGitHubId) => set({ prGitHubId }),
  setPullRequests: (pullRequests) => {
    set({ pullRequests });
  },
  getplayerPullRequests: () => get().player,
  setShowPullRequests: (showPullRequests) => set({ showPullRequests }),
  toggleShowPullRequests: (githubId) => {
    if (githubId === get().prGitHubId) {
      set((state) => ({ showPullRequests: !state.showPullRequests }));
    } else {
      set({
        prGitHubId: githubId,
        showPullRequests: true,
      });
    }
  },
}));
export const usePlayerTracks = create((set) => ({
  localTracks: [],
  remoteTracks: [],
  nearbyPlayers: [],
  setNearbyPlayers: (players) => set({ nearbyPlayers: players }),
}));

export const useGameSettings = create((set) => ({
  showSidebar: true,
  isFullScreen: false,
  resetPosition: false,
  setShowSidebar: (showSidebar) => set({ showSidebar }),
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
  setResetPosition: (resetPosition) => set({ resetPosition }),
}));
