import { map1Index } from './map1';
import styled from 'styled-components';
import { useState, useEffect, useRef, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePlayerPosition } from '@/firebase/firestore';
import {
  map1,
  map1Collision,
  wrapperHeight,
  wrapperWidth,
  playerHeight,
  playerWidth,
  mapHeight,
  mapWidth,
  mapBorder,
} from '@/Components/Maps/map1.js';
import { catsXPositions, catsYPositions } from '../../assets/charNames';
import { useUserState } from '../../utils/zustand';
const Wrapper = styled.div`
  position: relative;
  width: ${wrapperWidth}px;
  height: ${wrapperHeight}px;
  user-select: none;
`;

const Player = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${playerWidth}px;
  height: ${playerHeight}px;

  background-position: -767px -833px;
  background-size: 2048px 1088px;
  background-image: url(/images/animals/${(props) => props.$character}.png);
  &::after{
    content: '${(props) => props.$charName}';
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    top: -14px;
    width: 40px;
    height: 40px;
    color:black;
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
  &::after{
    content: '${(props) => props.$charName}';
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    top: -14px;
    width: 40px;
    height: 40px;
    color:black;
    white-space: nowrap;
  }
`;

const Map = styled.div`
  position: relative;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: ${wrapperWidth}px;
  height: 100%;
  border: ${mapBorder}px solid gray;
  transition: top 0.2s, left 0.2s;
`;
const MapImage = styled.div`
  position: absolute;
  border: 1px solid rgba(0, 0, 0,0.3);
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
export default function Map1({ players, playerCharName, setPlayerCharName }) {
  const { getUserData } = useUserState();
  const userId = getUserData().id;
  const { roomId } = useParams();

  const [position, dispatchPosition] = useReducer(positionReducer, null);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [direction, setDirection] = useState();
  const [playerChar, setPlayerChar] = useState(null);
 
  const movingTimer = useRef(null);
  const keysPressed = useRef(false);
  const canMove = useRef(true);
  const directionYPositions = catsYPositions;
  const framesXPositions = catsXPositions;

  useEffect(() => {
    if (!userId) return;
    
    const handleKeyPress = async (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return; 
      }
      let move = { top: 0, left: 0 };
      let keyDirection;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          move.top = map1.unit;
          keyDirection = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          move.top = -map1.unit;
          keyDirection = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          move.left = map1.unit;
          keyDirection = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          move.left = -map1.unit;
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
        x: Math.round(absolutePosition.left / map1.unit),
        y: Math.round(absolutePosition.top / map1.unit),
      };
      if (map1Collision.includes(`${playerGrid.x},${playerGrid.y}`)) {
        console.log('撞到東西');
        return;
      } else if (
        playerGrid.x < 0 ||
        playerGrid.y < 0 ||
        playerGrid.x >= mapWidth ||
        playerGrid.y >= mapHeight
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
    if (position || !players) return;
    const updatePosition = async () => {
      console.log(players, userId);
        const playerData =  players.filter(player=>player.userId === userId)
        const playerPosition =playerData[0].position
        setDirection(playerPosition.direction);
        setCurrentFrame(playerPosition.frame);
        const mapPosition = playerAbsoluteToMapPos(playerPosition);
        dispatchPosition({ type: 'SET_POSITION', payload: mapPosition });
        setPlayerChar(playerData[0].character)
        console.log(playerData[0].charName,'asd');
        setPlayerCharName(playerData[0].charName)
      } 

    updatePosition();
  }, [players]);

  const playerPosToAbsolute = (position) => {
    const absoluteLeft =
      wrapperWidth / 2 - playerWidth / 2 - mapBorder - position.left;
    const absoluteTop =
      wrapperHeight / 2 - playerHeight / 2 - mapBorder - position.top;
    console.log(absoluteLeft, absoluteTop);
    return { left: absoluteLeft, top: absoluteTop };
  };

  const playerAbsoluteToMapPos = (position) => {
    const mapLeft =
      wrapperWidth / 2 - playerWidth / 2 - mapBorder - position.left;
    const mapTop =
      wrapperHeight / 2 - playerHeight / 2 - mapBorder - position.top;
    return { left: mapLeft, top: mapTop };
  };

  const getItemStyles = (itemName) => {
    const item = map1Index[itemName];
    if (!item) return {};

    const width = item.width * map1.unit;
    const height = item.height * map1.unit;
    const backgroundPositionX = item.x * map1.unit;
    const backgroundPositionY = item.y * map1.unit;

    return {
      width,
      height,
      backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
    };
  };
  return (
    <>
      {position && (
        <Wrapper>
          <Map $top={`${position.top}px`} $left={`${position.left}px`}>
            {Object.keys(map1.objects).map((itemType) =>
              map1.objects[itemType].map((position, index) => {
                const itemStyles = getItemStyles(itemType);
                return (
                  <MapImage
                    key={`${itemType}-${index}`}
                    $width={`${itemStyles.width}px`}
                    $height={`${itemStyles.height}px`}
                    $left={`${position.left * map1.unit}px`}
                    $top={`${position.top * map1.unit}px`}
                    $backgroundPosition={itemStyles.backgroundPosition}
                  />
                );
              })
            )}
            {players &&
              players.map((player) => {
                if (player.userId === userId) return;
                return (
                  <OtherPlayer
                    $top={`${player.position.top}px`}
                    $left={`${player.position.left}px`}
                    $backgroundPosition={`${
                      framesXPositions[player.position.frame]
                    } ${directionYPositions[player.position.direction]}`}
                    $character={player.character}
                    key={player.userId}
                    $charName={player.charName}
                  >
                    {player.name}
                  </OtherPlayer>
                );
              })}
          </Map>

          {position && playerChar &&(
            <Player
              style={{
                backgroundPosition: `${framesXPositions[currentFrame]} ${directionYPositions[direction]}`,
              }}
              $charName={playerCharName}
              $character={`${playerChar}`}
            ></Player>
          )}
        </Wrapper>
      )}
    </>
  );
}

{
  /* <Wrapper>
        {Object.keys(map1.objects).map((itemType) =>
          map1.objects[itemType].map((position, index) => {
            const itemStyles = getItemStyles(itemType);
            return (
              <MapImage
                key={`${itemType}-${index}`}
                width={`${itemStyles.width}px`}
                height={`${itemStyles.height}px`}
                left={`${position.left * map1.unit}px`}
                top={`${position.top * map1.unit}px`}
                backgroundPosition={itemStyles.backgroundPosition}
              />
            );
          })
        )}
      </Wrapper> */
}
{
  /* <button onClick={generateCollisionMap}>創建碰撞array</button> */
}
// const getItemStyles = (itemName) => {
//   const item = map1Index[itemName];
//   if (!item) return {};

//   const width = item.width * map1.unit;
//   const height = item.height * map1.unit;
//   const backgroundPositionX = item.x * map1.unit;
//   const backgroundPositionY = item.y * map1.unit;

//   return {
//     width,
//     height,
//     backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
//   };
// };
