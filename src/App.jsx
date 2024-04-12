import { useState, useEffect, useRef, useReducer } from 'react';
import styled from 'styled-components';
import BaseGlobalStyle from './BaseGlobalStyle';
import { updatePlayerPosition, getPlayerPosition } from './firebase/firestore';
import { useOtherPlayer } from './utils/hooks/useOherPlayer';
import { map1, map1Index, map1Collision } from './assets/maps/map1';
const wrapperWidth = '920';
const wrapperHeight = '680';
const mapBorder = '100';
const mapWidth = (wrapperWidth - 2 * mapBorder) / map1.unit;
const mapHeight = (wrapperHeight - 2 * mapBorder) / map1.unit;
const playerWidth = '60';
const playerHeight = '60';
const Wrapper = styled.div`
  position: relative;
  width: ${wrapperWidth}px;
  height: ${wrapperHeight}px;
  overflow: hidden;
  user-select: none;
  background-color: lightgray;
`;
const Map = styled.div`
  position: relative;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: 100%;
  height: 100%;
  border: ${mapBorder}px solid gray;
  transition: top 0.2s, left 0.2s;
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
  background-image: url(/images/animals/calico_0.png);
  color: black;
`;
const OtherPlayer = styled.div`
  position: absolute;
  width: ${playerWidth}px;
  height: ${playerHeight}px;
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  background-position: ${(props) => props.$backgroundPosition};
  background-size: 2048px 1088px;
  background-image: url(/images/animals/gold_0.png);
  color: black;
  transition: top 0.2s, left 0.2s;
`;
const MapImage = styled.div`
  position: absolute;
  border: 1px solid black;
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
function App() {
  const [position, dispatchPosition] = useReducer(positionReducer, null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [direction, setDirection] = useState();
  const [playerName, setPlayerName] = useState('');
  const nameInput = useRef(null);
  const otherPlayers = useOtherPlayer(playerName);
  const directionYPositions = {
    down: '-64px',
    left: '-320px',
    up: '-573px',
    right: '-833px',
  };

  const framesXPositions = ['-767px', '-832px', '-897px', '-963px'];
  useEffect(() => {
    if (!playerName) return;
    const handleKeyPress = async (e) => {
      if (!playerName) return;
      let move = { top: 0, left: 0 };
      let keyDirection;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          move.top = map1.unit;
          setDirection('up');
          keyDirection='up'
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          move.top = -map1.unit;
          setDirection('down');
          keyDirection='down'
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          move.left = map1.unit;
          setDirection('left');
          keyDirection='left'
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          move.left = -map1.unit;
          setDirection('right');
          keyDirection='right'
          break;
        default:
          return;
      }
      const absolutePosition = playerPosToAbsolute({
        top: position.top + move.top,
        left: position.left + move.left,
      });
      const playerGrid = {
        x: Math.round(absolutePosition.left / map1.unit),
        y: Math.round(absolutePosition.top / map1.unit),
      };
      console.log(playerGrid);
      console.log(mapWidth, mapHeight);
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

      setCurrentFrame((prevFrame) => (prevFrame + 1) % framesXPositions.length);
      dispatchPosition({ type: 'move', payload: move });

      await updatePlayerPosition(playerName, {
        ...absolutePosition,
        direction:keyDirection,
        frame: currentFrame,
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [position]);

  useEffect(() => {
    if (!playerName) return;
    const updatePosition = async () => {
      try {
        const playerPosition = await getPlayerPosition(playerName);
        setDirection(playerPosition.direction);
        const mapPosition = playerAbsoluteToMapPos(playerPosition);
        dispatchPosition({ type: 'SET_POSITION', payload: mapPosition });
      } catch (error) {
        console.error('Error updating position:', error);
      }
    };
    updatePosition();
  }, [playerName]);
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

  return (
    <>
      <BaseGlobalStyle />

      {playerName && (
        <Wrapper>
          {position && (
            <Map1 position={position}>
              {otherPlayers &&
                otherPlayers.map((player) => (
                  <OtherPlayer
                    $top={`${player.position.top}px`}
                    $left={`${player.position.left}px`}
                    $backgroundPosition={`${
                      framesXPositions[player.position.frame]
                    } ${directionYPositions[player.position.direction]}`}
                    key={player.name}
                  >
                    {player.name}
                  </OtherPlayer>
                ))}
            </Map1>
          )}
          {position && (
            <Player
              style={{
                backgroundPosition: `${framesXPositions[currentFrame]} ${directionYPositions[direction]}`,
              }}
            ></Player>
          )}
        </Wrapper>
      )}
      <input type="text" placeholder="輸入你的名稱" ref={nameInput} />
      <button
        onClick={() => {
          setPlayerName(nameInput.current.value);
        }}
      >
        送出
      </button>
    </>
  );
}

export default App;

function Map1({ position, children }) {
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
      {children}
    </Map>
  );
}
      {/* <Wrapper>
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
      </Wrapper> */}
      {/* <button onClick={generateCollisionMap}>創建碰撞array</button> */}
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