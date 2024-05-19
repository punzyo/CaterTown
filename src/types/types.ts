import { Timestamp } from 'firebase/firestore';
export interface PullRequest {
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

export interface PlayerPosition {
  top: number;
  left: number;
  direction: string;
  frame: number;
}

export interface PlayerType {
  gitHubId: string;
  character: string;
  charName: string;
  room: string;
  userId: string;
  permissionLevel: string;
  position: PlayerPosition;
}

export interface NearbyPlayer {
  charName: string;
  character: string;
}
export interface BroadcastData {
  userId: string;
  charName: string;
  title: string;
  publishTime: Timestamp;
  expirationTime: string;
  content: string;
}
