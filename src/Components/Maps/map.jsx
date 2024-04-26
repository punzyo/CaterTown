import { mapIndex } from './map1';
import styled from 'styled-components';
import { useState, useEffect, useRef, useReducer, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePlayerPosition } from '@/firebase/firestore';
import {
  map1,
  map1Collision,
  playerHeight,
  playerWidth,
} from '@/Components/Maps/map1.js';
import { map2,map2Collision } from './map2.js';
import { catsXPositions, catsYPositions } from '../../assets/charNames';
import { useUserState } from '../../utils/zustand';
import TracksManager from '../TracksManager';
import RemoteTracks from '../Tracks/RemoteTracks';
import PRMark from '../PRMark';
const Wrapper =styled.div`
width: 100%;
height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
overflow: hidden;
`
const MapWrapper = styled.div`
  position: relative;
  width: ${map2.width}px;
  height: ${map2.height}px;
  user-select: none;
  /* margin:0 auto; */
`;

const Player = styled.div`
  position: absolute;
  top: calc(50% - ${playerHeight/2}px);
  left: calc(50% - ${playerWidth/2}px);
  /* transform: translate(-50%, -50%); */
  width: ${playerWidth}px;
  height: ${playerHeight}px;
  z-index: 10;
  background-position: -767px -833px;
  background-size: 2048px 1088px;
  background-image: url(/images/animals/${(props) => props.$character}.png);
  &::after {
    content: '${(props) => props.$charName}';
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    bottom: -26px;
    width: 40px;
    height: 40px;
    color: black;
    white-space: nowrap;
  }
`;
const OtherPlayer = styled.div`
  position: absolute;
  width: ${playerWidth}px;
  height: ${playerHeight}px;
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  background-position: ${(props) => props.$backgroundPosition};
  background-size: 2048px 1088px;
  background-image: url(/images/animals/${(props) => props.$character}.png);
  color: black;
  transition: top 0.2s, left 0.2s;
  z-index:10;
  &::after {
    content: '${(props) => props.$charName}';
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    bottom: -26px;
    width: 40px;
    height: 40px;
    color: black;
    white-space: nowrap;
  }
`;

const MapABC = styled.div`

  position: relative;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: ${map2.width}px;
  height: ${map2.height}px;
  border: ${map2.border}px solid gray;
  transition: top 0.2s, left 0.2s;
`;
const MapImage = styled.div`
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  background-position: ${(props) => props.$backgroundPosition};
  background-image: url(/images/map/map1_48x48.png);
`;
function positionReducer(state, action) {
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
    case 'SET_POSITION':
      return action.payload;
    default:
      return state;
  }
}
export default function Map({ players, playerCharName, setPlayerCharName,permissionLevel, setPermissionLevel,gitHubId,setGitHubId, pullRequests  }) {
  const { getUserData } = useUserState();
  const userId = getUserData().id;
  const { roomId } = useParams();

  const [position, dispatchPosition] = useReducer(positionReducer, null);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [direction, setDirection] = useState();
  const [playerChar, setPlayerChar] = useState(null);
  const [nearbyPlayers, setNearbyPlayers] = useState([]);
  const movingTimer = useRef(null);
  const keysPressed = useRef(false);
  const canMove = useRef(true);
  const directionYPositions = catsYPositions;
  const framesXPositions = catsXPositions;

  useEffect(() => {
    if (!userId) return;

    const handleKeyPress = async (e) => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }
      let move = { top: 0, left: 0 };
      let keyDirection;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          move.top = map2.unit;
          keyDirection = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          move.top = -map2.unit;
          keyDirection = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          move.left = map2.unit;
          keyDirection = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          move.left = -map2.unit;
          keyDirection = 'right';
          break;
        default:
          return;
      }
      setDirection(keyDirection);
      // console.log(keysPressed.current, direction, keyDirection);
      //  if(direction!==keyDirection){
      //   console.log('轉',direction, keyDirection);
      //   clearTimeout(movingTimer.current)
      //   movingTimer.current = setTimeout(() => {
      //     handleKeyPress(e)
      //   }, 150);

      // }
      if (!canMove.current) return;

      console.log('要走囉');
      const absolutePosition = playerPosToAbsolute({
        top: position.top + move.top,
        left: position.left + move.left,
      });
      const playerGrid = {
        x: Math.round(absolutePosition.left / map2.unit),
        y: Math.round(absolutePosition.top / map2.unit),
      };
      if (map2Collision[`${playerGrid.x},${playerGrid.y}`]) {
        console.log('撞到東西');
        return;
      } else if (
        playerGrid.x < 0 ||
        playerGrid.y < 0 ||
        playerGrid.x >= map2.unitWidth ||
        playerGrid.y >= map2.unitHeight
      ) {
        console.log('超出地圖邊界');
        return;
      }
      //player can move
      canMove.current = false;
      keysPressed.current = true;
      const nextframe = (currentFrame + 1) % framesXPositions.length;
      setCurrentFrame(nextframe);
      dispatchPosition({ type: 'move', payload: move });

      await updatePlayerPosition({
        userId,
        userData: {
          ...absolutePosition,
          direction: keyDirection,
          frame: nextframe,
        },
        roomId,
      });

      setTimeout(() => {
        canMove.current = true;
      }, 100);
    };
    const handleKeyUp = () => {
      clearTimeout(movingTimer.current);
      keysPressed.current = false;
    };
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [position]);

  useEffect(() => {
    //initializate player position
    if (position || !players) return;
    const updatePosition = async () => {
      console.log(players, userId);
      const playerData = players.filter((player) => player.userId === userId);
      const playerPosition = playerData[0].position;
      setDirection(playerPosition.direction);
      setCurrentFrame(playerPosition.frame);
      const mapPosition = playerAbsoluteToMapPos(playerPosition);
      dispatchPosition({ type: 'SET_POSITION', payload: mapPosition });
      setPlayerChar(playerData[0].character);
      setPlayerCharName(playerData[0].charName);
      setPermissionLevel(playerData[0].permissionLevel);
      setGitHubId(playerData[0].gitHubId);
    };

    updatePosition();
  }, [players]);
  useEffect(() => {
    if (!players || !position) return;
    countNearbyPlayers(players);
  }, [players, position]);

  const countNearbyPlayers = (players) => {
    const gridRange = 96;
    const myPosition = playerPosToAbsolute(position);
    const nearbyPlayers = players.filter((player) => {
      const xInRange =
        Math.abs(player.position.left - myPosition.left) <= gridRange;
      const yInRange =
        Math.abs(player.position.top - myPosition.top) <= gridRange;
      return player.charName !== playerCharName && xInRange && yInRange;
    });
    setNearbyPlayers(nearbyPlayers.map((player) => {
      return(
        {
          charName :player.charName,
          character:player.character
        }
      )
    }));
    return;
  };

  const playerPosToAbsolute = (position) => {
    const absoluteLeft =
      map2.width / 2 - playerWidth / 2 - map2.border - position.left;
    const absoluteTop =
      map2.height / 2 - playerHeight / 2 - map2.border - position.top;
    console.log(absoluteLeft, absoluteTop);
    return { left: absoluteLeft, top: absoluteTop };
  };

  const playerAbsoluteToMapPos = (position) => {
    const mapLeft =
      map2.width / 2 - playerWidth / 2 - map2.border - position.left;
    const mapTop =
      map2.height / 2 - playerHeight / 2 - map2.border - position.top;
    return { left: mapLeft, top: mapTop };
  };

  const getItemStyles = (itemName) => {
    const item = mapIndex[itemName];
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
  const mapElements = useMemo(() => (
    Object.keys(map2.objects).map(itemType => 
      map2.objects[itemType].map((pos, index) => {
        const itemStyles = getItemStyles(itemType);
        return (
          <MapImage
            key={`${itemType}-${index}`}
            $width={`${itemStyles.width}px`}
            $height={`${itemStyles.height}px`}
            $left={`${pos.left * map2.unit}px`}
            $top={`${pos.top * map2.unit}px`}
            $backgroundPosition={itemStyles.backgroundPosition}
          />
        );
      })
    )
  ), [map2]);

  const playerElements = useMemo(() => (
    players?.filter(player => player.userId !== userId).map(player => (
      <OtherPlayer
        key={player.userId}
        $top={`${player.position.top}px`}
        $left={`${player.position.left}px`}
        $backgroundPosition={`${framesXPositions[player.position.frame]} ${directionYPositions[player.position.direction]}`}
        $character={player.character}
        $charName={player.charName}
      >
        {permissionLevel === 'admin' && <PRMark githubId={player.githubId} pullRequests={pullRequests}/>}
      </OtherPlayer>
    ))
  ), [players, userId, permissionLevel, pullRequests]);

  return (
    <Wrapper>
    
      {position && (
        <MapWrapper>
           <MapABC $top={`${position.top}px`} $left={`${position.left}px`}>
          {mapElements}
          {playerElements}
        </MapABC>

          {position && playerChar && (
            <Player
              style={{
                backgroundPosition: `${framesXPositions[currentFrame]} ${directionYPositions[direction]}`,
              }}
              $charName={playerCharName}
              $character={`${playerChar}`}
            >
              <TracksManager isLocal={false} nearbyPlayers={nearbyPlayers}>
                {(remoteTracks) => <RemoteTracks tracks={remoteTracks} nearbyPlayers={nearbyPlayers} />}
              </TracksManager>
              {<PRMark githubId={gitHubId} pullRequests={pullRequests}/>}

            </Player>
          )}
        </MapWrapper>
      )}
    </Wrapper>
  );
}

{
  /* <MapWrapper>
        {Object.keys(map2.objects).map((itemType) =>
          map1.objects[itemType].map((position, index) => {
            const itemStyles = getItemStyles(itemType);
            return (
              <MapImage
                key={`${itemType}-${index}`}
                width={`${itemStyles.width}px`}
                height={`${itemStyles.height}px`}
                left={`${position.left * map2.unit}px`}
                top={`${position.top * map2.unit}px`}
                backgroundPosition={itemStyles.backgroundPosition}
              />
            );
          })
        )}
      </MapWrapper> */
}
{
  /* <button onClick={generateCollisionMap}>創建碰撞array</button> */
}
// const getItemStyles = (itemName) => {
//   const item = mapIndex[itemName];
//   if (!item) return {};

//   const width = item.width * map2.unit;
//   const height = item.height * map2.unit;
//   const backgroundPositionX = item.x * map2.unit;
//   const backgroundPositionY = item.y * map2.unit;

//   return {
//     width,
//     height,
//     backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
//   };
// };