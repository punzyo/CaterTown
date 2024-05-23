import styled from 'styled-components';
import {
  useState,
  useEffect,
  useRef,
  useReducer,
  useMemo,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import { updatePlayerPosition } from '@/utils/firebase/firestore';
import {
  mapIndex,
  playerHeight,
  playerWidth,
  map2,
  map2Collision,
  map2Room,
} from './map2';
import { catsXPositions } from '@/assets/charNames';
import { useUserState } from '@/utils/zustand';
import RemoteTracks from '@/Components/Tracks/RemoteTracks/index';
import { useGameSettings } from '@/utils/zustand';
import BroadcastMarquee from './BroadcastMarquee/index';
import Player from './Player/index';
import type { PlayerType, PullRequests, BroadcastData } from '@/types/types.js';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const MapWrapper = styled.div`
  position: relative;
  width: ${map2.width}px;
  height: ${map2.height}px;
  user-select: none;
`;
interface MapBorderProps {
  $top: string;
  $left: string;
  $backgroundPosition?: string;
}
const MapBorder = styled.div<MapBorderProps>`
  position: relative;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${map2.width}px;
  height: ${map2.height}px;
  border: ${map2.border}px solid gray;
  transition: top 0.2s, left 0.2s;
`;
interface MapImageProps extends MapBorderProps {
  $width: string;
  $height: string;
  $backgroundPosition: string;
}
const MapImage = styled.div.attrs<MapImageProps>((props) => ({
  style: {
    width: `${props.$width}`,
    height: `${props.$height}`,
    left: `${props.$left}`,
    top: `${props.$top}`,
    backgroundPosition: `${props.$backgroundPosition}`,
  },
}))`
  position: absolute;
  background-image: url(/images/map/map1_48x48.png);
`;
type State = {
  top: number;
  left: number;
} | null;

type Action =
  | { type: 'move'; payload: { top: number; left: number } }
  | { type: 'setPosition'; payload: { top: number; left: number } };

function positionReducer(state: State, action: Action): State {
  if (state === null) {
    if (action.type === 'setPosition') {
      return action.payload;
    }
    return state;
  }
  switch (action.type) {
    case 'move':
      return {
        ...state,
        top:
          action.payload.top !== undefined
            ? state.top + action.payload.top
            : state.top,
        left:
          action.payload.left !== undefined
            ? state.left + action.payload.left
            : state.left,
      };
    case 'setPosition':
      return action.payload;
    default:
      return state;
  }
}
const MarqueeWrapper = styled.div`
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 11;
  .rfm-marquee-container {
    overflow: visible !important;
  }
`;
interface KeyMapValue {
  top?: number;
  left?: number;
  direction: 'up' | 'down' | 'left' | 'right';
}
const keyMap: Record<string, KeyMapValue> = {
  ArrowUp: { top: map2.unit, direction: 'up' },
  w: { top: map2.unit, direction: 'up' },
  W: { top: map2.unit, direction: 'up' },
  ArrowDown: { top: -map2.unit, direction: 'down' },
  s: { top: -map2.unit, direction: 'down' },
  S: { top: -map2.unit, direction: 'down' },
  ArrowLeft: { left: map2.unit, direction: 'left' },
  a: { left: map2.unit, direction: 'left' },
  A: { left: map2.unit, direction: 'left' },
  ArrowRight: { left: -map2.unit, direction: 'right' },
  d: { left: -map2.unit, direction: 'right' },
  D: { left: -map2.unit, direction: 'right' },
};
interface MapProps {
  players: PlayerType[] | undefined;
  playerCharName: string;
  setPermissionLevel: React.Dispatch<React.SetStateAction<string | null>>;
  playerChar:string;
  permissionLevel: string;
  gitHubId: string ;
  pullRequests: PullRequests;
  broadcasts: BroadcastData[];
}
export default function Map({
  players,
  playerCharName,
  permissionLevel,
  gitHubId,
  playerChar,
  pullRequests,
  broadcasts,
}: MapProps) {
  const { user } = useUserState();
  const userId = user?.id;
  const { roomId } = useParams();
  const [position, dispatchPosition] = useReducer(positionReducer, null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [direction, setDirection] = useState('');

  const [nearbyPlayers, setNearbyPlayers] = useState<
    { charName: string; character: string }[]
  >([]);
  const [room, setRoom] = useState('');
  const canMove = useRef(true);
  const { resetPosition, setResetPosition, isFullScreen } = useGameSettings();

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (!players || !userId || !roomId || !position) return;
      if (
        isFullScreen ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      const move = keyMap[e.key];
      if (!move || !canMove.current) return;

      setDirection(move.direction);

      const newTop = position.top + (move.top || 0);
      const newLeft = position.left + (move.left || 0);
      const absolutePosition = calculatePlayerPosition({
        top: newTop,
        left: newLeft,
      });
      const playerGrid = {
        x: Math.round(absolutePosition.left / map2.unit),
        y: Math.round(absolutePosition.top / map2.unit),
      };

      if (
        map2Collision[`${playerGrid.x},${playerGrid.y}`] ||
        playerGrid.x < 0 ||
        playerGrid.y < 0 ||
        playerGrid.x >= map2.unitWidth ||
        playerGrid.y >= map2.unitHeight
      ) {
        return;
      }

      dispatchPosition({
        type: 'move',
        payload: { top: move.top || 0, left: move.left || 0 },
      });
      const nextFrame = (currentFrame + 1) % catsXPositions.length;
      setCurrentFrame(nextFrame);

      let enterRoom = map2Room[`${playerGrid.x},${playerGrid.y}`];
      if (enterRoom === undefined) enterRoom = room;
      setRoom(enterRoom);

      updatePlayerPosition({
        userId,
        position: {
          ...absolutePosition,
          direction: move.direction,
          frame: nextFrame,
        },
        roomId,
        room: enterRoom,
      });

      canMove.current = false;
      setTimeout(() => {
        canMove.current = true;
      }, 100);
    },
    [position, isFullScreen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    //initialize player position
    if (position || !players) return;
    const updatePosition = async () => {
      const playerData = players.filter((player) => player.userId === userId);
      const playerPosition = playerData[0].position;
      setDirection(playerPosition.direction);
      setCurrentFrame(playerPosition.frame);
      const mapPosition = calculatePlayerPosition(playerPosition);
      dispatchPosition({ type: 'setPosition', payload: mapPosition });

      setRoom(playerData[0].room);
    };
    updatePosition();
  }, [players]);

  useEffect(() => {
    if (!players || !position) return;
    countNearbyPlayers(players);
  }, [players, position]);

  useEffect(() => {
    if (!resetPosition || !userId || !roomId) return;
    (async () => {
      const newPosition = calculatePlayerPosition(map2.startingPoint);
      setDirection(map2.startingPoint.direction);
      setCurrentFrame(map2.startingPoint.frame);
      dispatchPosition({ type: 'setPosition', payload: newPosition });
      setRoom('');
      await updatePlayerPosition({
        userId,
        position: {
          ...map2.startingPoint,
        },
        roomId,
        room: '',
      });

      setResetPosition(false);
    })();
  }, [resetPosition]);
  const countNearbyPlayers = (players: PlayerType[]) => {
    if (!position) return;
    const gridRange = 96;
    const myPosition = calculatePlayerPosition(position);
    let nearbyPlayers;
    if (!room) {
      nearbyPlayers = players.filter((player) => {
        const xInRange =
          Math.abs(player.position.left - myPosition.left) <= gridRange;
        const yInRange =
          Math.abs(player.position.top - myPosition.top) <= gridRange;
        return (
          player.charName !== playerCharName &&
          xInRange &&
          yInRange &&
          player.room === room
        );
      });
    } else {
      nearbyPlayers = players.filter((player) => {
        return player.charName !== playerCharName && player.room === room;
      });
    }
    setNearbyPlayers(
      nearbyPlayers.map((player) => {
        return {
          charName: player.charName,
          character: player.character,
        };
      })
    );
    return;
  };

  const calculatePlayerPosition = (position: { top: number; left: number }) => {
    const calculatedLeft =
      map2.width / 2 - playerWidth / 2 - map2.border - position.left;
    const calculatedTop =
      map2.height / 2 - playerHeight / 2 - map2.border - position.top;
    return { left: calculatedLeft, top: calculatedTop };
  };
  const getItemStyles = (itemType: string) => {
    const item = mapIndex[itemType];
    if (!item) return {};

    const width = item.width * map2.unit;
    const height = item.height * map2.unit;
    const backgroundPositionX = item.x * map2.unit;
    const backgroundPositionY = item.y * map2.unit;

    return {
      width,
      height,
      backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
    };
  };
  const mapElements = useMemo(
    () =>
      Object.keys(map2.objects).map((itemType) =>
        map2.objects[itemType].map((pos, index) => {
          const itemStyles = getItemStyles(itemType);
          return (
            <MapImage
              key={`${itemType}-${index}`}
              $width={`${itemStyles.width}px`}
              $height={`${itemStyles.height}px`}
              $left={`${pos.left * map2.unit}px`}
              $top={`${pos.top * map2.unit}px`}
              $backgroundPosition={itemStyles.backgroundPosition as string}
            />
          );
        })
      ),
    []
  );
 
  const playerElements = useMemo(
    () =>
      players
        ?.filter((player) => player.userId !== userId)
        .map((player) => (
          <Player
            userId={player.userId}
            key={player.userId}
            character={player.character}
            charName={player.charName}
            left={player.position.left}
            top={player.position.top}
            frame={player.position.frame}
            direction={player.position.direction}
            isCurrentPlayer={false}
            permissionLevel={permissionLevel}
            gitHubId={player.gitHubId}
            pullRequests={pullRequests}
          />
        )),
    [players, userId, permissionLevel, pullRequests]
  );

  const currentPlayerElement = useMemo(
    () =>
      position &&
      playerChar &&
      userId && (
        <Player
          userId={userId}
          character={playerChar}
          charName={playerCharName}
          left={position.left}
          top={position.top}
          frame={currentFrame}
          direction={direction}
          isCurrentPlayer={true}
          permissionLevel={permissionLevel}
          gitHubId={gitHubId}
          pullRequests={pullRequests}
        >
          <RemoteTracks nearbyPlayers={nearbyPlayers} />
        </Player>
      ),
    [
      position,
      playerChar,
      currentFrame,
      playerCharName,
      direction,
      nearbyPlayers,
      gitHubId,
      pullRequests,
      permissionLevel,
    ]
  );

  return (
    <Wrapper>
      {broadcasts.length > 0 && userId && roomId && (
        <MarqueeWrapper>
          <BroadcastMarquee
            broadcasts={broadcasts}
            userId={userId}
            roomId={roomId}
          />
        </MarqueeWrapper>
      )}

      {position ? (
        <MapWrapper>
          <MapBorder $top={`${position.top}px`} $left={`${position.left}px`}>
            {mapElements}
            {playerElements}
          </MapBorder>
          {position && playerChar && currentPlayerElement}
        </MapWrapper>
      ) : (
        <img
          src="/images/catLoading2.gif"
          style={{
            width: '50%',
            height: '50%',
            objectFit: 'cover',
            marginRight: '300px',
          }}
          alt="loading"
        />
      )}
    </Wrapper>
  );
}
