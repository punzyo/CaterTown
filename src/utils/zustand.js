import { create } from 'zustand';
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
  allTracks: [],
  localTracks: [],
  remoteTracks: [],
  nearbyPlayers: [],
  setTracks: (allTracks) => set({ allTracks }),
  setNearbyPlayers: (nearbyPlayers) => set({ nearbyPlayers }),
}));

export const useGameSettings = create((set) => ({
  showSidebar: true,
  isFullScreen: false,
  resetPosition: false,
  setShowSidebar: (showSidebar) => set({ showSidebar }),
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
  setResetPosition: (resetPosition) => set({ resetPosition }),
}));
