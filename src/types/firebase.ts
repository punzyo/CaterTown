import { Timestamp } from 'firebase/firestore';
import { PlayerPosition, PlayerType } from './props';

  export interface Room {
    name: string;
    createDate: Timestamp;
    map: string;
  }
  
  export interface UserData extends PlayerType {
    position: PlayerPosition;
  }
  
  export interface PublicMessage {
    charName: string;
    message: string;
    postTime: Timestamp;
  }
  
  export interface PrivateMessage {
    charName: string;
    message: string;
  }
  
  export interface UnreadMessage {
    messages: {
      [userId: string]: {
        count: number;
      };
    };
  }
  export interface BroadcastData {
    userId: string;
    charName: string;
    title: string;
    publishTime: Timestamp;
    expirationTime: string; 
    content: string;
  }
  export interface TutorialState {
    hasViewedHomePageTutorial1: boolean;
    hasViewedHomePageTutorial2: boolean;
    hasViewedGamePageTutorial: boolean;
  }