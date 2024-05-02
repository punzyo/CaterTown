import { create } from 'zustand';
import { Track } from 'livekit-client';
export const useUserState = create((set, get) => ({
  loginChecked:false,
  user: {
    name: '',
    email: '',
    id: '',
  },
  setLoginChecked: (loginChecked) => set({ loginChecked }),
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
