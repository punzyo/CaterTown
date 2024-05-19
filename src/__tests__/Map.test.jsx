import { render, screen } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';
import React from 'react';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.React = React;
import '@testing-library/jest-dom';
import Map from '../Components/Pages/GamePage/Maps/index';

jest.mock('@/utils/zustand', () => ({
  useUserState: jest.fn(),
  useGameSettings: jest.fn(),
  usePullRequests: jest.fn(),
  usePlayerTracks: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));
jest.mock('@/utils/firebase/firestore.ts', () => ({
  updatePlayerPosition: jest.fn(),
}));
jest.mock('../Components/Pages/GamePage/Maps/map2.js', () => ({
  mapIndex: {
    rockFloor6: {
      width: 2,
      height: 1,
      x: -2,
      y: -10,
      collision: false,
    },
  },

  map2: {
    unit: 48,
    width: 1920,
    height: 1440,
    border: 0,
    unitWidth: 40,
    unitHeight: 30,
    startingPoint: { top: 470, left: 1002, direction: 'down', frame: 0 },
    objects: {
      rockFloor6: [
        {
          left: 20,
          top: 7,
        },
      ],
    },
  },
}));
const mockUseUserState = require('@/utils/zustand').useUserState;
const mockUseGameSettings = require('@/utils/zustand').useGameSettings;
const mockUseParams = require('react-router-dom').useParams;
const mockUpdatePlayerPosition =
  require('@/utils/firebase/firestore.ts').updatePlayerPosition;
const mockUsePullRequests = require('@/utils/zustand').usePullRequests;
const mockUsePlayerTracks = require('@/utils/zustand').usePlayerTracks;

describe('Map Component', () => {
  beforeEach(() => {
    mockUseUserState.mockReturnValue({
      user: { id: 'testUserId' },
    });
    mockUseGameSettings.mockReturnValue({
      resetPosition: false,
      setResetPosition: jest.fn(),
      isFullScreen: false,
    });
    mockUseParams.mockReturnValue({ roomId: 'testRoomId' });
    mockUpdatePlayerPosition.mockImplementation(() => Promise.resolve());
    mockUsePullRequests.mockReturnValue([]);
    mockUsePlayerTracks.mockReturnValue({ allTracks: [] });
  });

  it('should render loading state initially', () => {
    render(
      <Map
        players={undefined}
        broadcasts={[]}
        setPlayerCharName={jest.fn()}
        setPermissionLevel={jest.fn()}
        setGitHubId={jest.fn()}
      />
    );
    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });

  it('should render map and players correctly when position is set', async () => {
    const mockPlayers = [
      {
        userId: 'testUserId',
        position: { left: 100, top: 100, frame: 0, direction: 'down' },
        character: 'black_0',
        charName: 'testChar',
        room: '',
      },
      {
        userId: 'otherUserId',
        position: { left: 150, top: 150, frame: 0, direction: 'up' },
        character: 'black_1',
        charName: 'otherChar',
        room: '',
      },
    ];

    render(
      <Map
        players={mockPlayers}
        broadcasts={[]}
        setPlayerCharName={jest.fn()}
        setPermissionLevel={jest.fn()}
        setGitHubId={jest.fn()}
        pullRequests={[]}
        gitHubId="abc"
      />
    );
    const player1 = screen.getByTestId('testUserId');
    const player2 = screen.getByTestId('otherUserId');
    expect(player1).toBeInTheDocument();
    expect(player2).toBeInTheDocument();
  });
});
