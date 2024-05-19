import { create } from 'zustand';
import type { Track } from 'livekit-client';
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  setUser: (userData: User) => void;
  resetUser: () => void;
}

export const useUserState = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem('CaterTownUser') || 'null'),
  setUser: (userData) => {
    localStorage.setItem('CaterTownUser', JSON.stringify(userData));
    set({ user: userData });
  },
  resetUser: () => {
    localStorage.removeItem('CaterTownUser');
    set({ user: null });
  },
}));

interface PullRequest {
  title: string;
  baseBranch: string;
  id: number;
  avatar_url: string;
  repo: string;
  description: string;
  user: string;
  createdAt: string;
  state: string;
  url: string;
  action: string;
  headBranch: string;
}
interface PullRequestState {
  showPullRequests: boolean;
  prGitHubId: string;
  pullRequests: PullRequest[];
  setPrGitHubId: (prGitHubId: string) => void;
  setPullRequests: (pullRequests: PullRequest[]) => void;
  setShowPullRequests: (showPullRequests: boolean) => void;
  toggleShowPullRequests: (githubId: string) => void;
}
export const usePullRequests = create<PullRequestState>((set, get) => ({
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
interface PlayerTracksState {
  allTracks: Track[];
  setTracks: (allTracks: Track[]) => void;
}

export const usePlayerTracks = create<PlayerTracksState>((set) => ({
  allTracks: [],
  setTracks: (allTracks) => set({ allTracks }),
}));
interface GameSettingsState {
  showSidebar: boolean;
  isFullScreen: boolean;
  resetPosition: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  setIsFullScreen: (isFullScreen: boolean) => void;
  setResetPosition: (resetPosition: boolean) => void;
}

export const useGameSettings = create<GameSettingsState>((set) => ({
  showSidebar: true,
  isFullScreen: false,
  resetPosition: false,
  setShowSidebar: (showSidebar) => set({ showSidebar }),
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
  setResetPosition: (resetPosition) => set({ resetPosition }),
}));
