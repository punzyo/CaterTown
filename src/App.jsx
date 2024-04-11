import { useState, useEffect, useRef, useReducer } from 'react';
import styled from 'styled-components';
import BaseGlobalStyle from './BaseGlobalStyle';
import { updatePlayerPosition, getPlayerPosition } from './firebase/firestore';
import { useOtherPlayer } from './utils/hooks/useOherPlayer';
const mapIndex = {
  U: {
    width: 4,
    height: 1,
    x: 4,
    y: 0,
  },
  leftWater: {
    width: 1,
    height: 1,
    x: 5,
    y: 0,
  },
  waterpool: {
    width: 3,
    height: 3,
    x: 8,
    y: 0,
  },
  floor1: {
    width: 1,
    height: 1,
    x: 9,
    y: -2,
  },
  floor2: {
    width: 1,
    height: 1,
    x: 10,
    y: -1,
  },
  floor3: {
    width: 1,
    height: 1,
    x: 10,
    y: -2,
  },
  floor4: {
    width: 1,
    height: 1,
    x: 10,
    y: -3,
  },
  floor5: {
    width: 1,
    height: 1,
    x: 11,
    y: -3,
  },
  floor6: {
    width: 2,
    height: 1,
    x: 12,
    y: -1,
  },
  floor7: {
    width: 1,
    height: 1,
    x: 11,
    y: -2,
  },
  floor8: {
    width: 2,
    height: 1,
    x: 12,
    y: -3,
  },
  floor9: {
    width: 1,
    height: 1,
    x: 13,
    y: -3,
  },
  floor10: {
    width: 1,
    height: 1,
    x: 13,
    y: -1,
  },
  floor11: {
    width: 1,
    height: 1,
    x: 13,
    y: -2,
  },
  floor12: {
    width: 1,
    height: 1,
    x: 16,
    y: -2,
  },
  tree1: {
    width: 8,
    height: 3,
    x: 10,
    y: -10,
  },
  tree2: {
    width: 2,
    height: 2.5,
    x: 10,
    y: -12.5,
  },
  tree3: {
    width: 5,
    height: 3,
    x: 10,
    y: -15,
  },
  tree4: {
    width: 5,
    height: 3,
    x: 10,
    y: -18,
  },
  house1: {
    width: 4,
    height: 3,
    x: 13,
    y: -21,
  },
};

const map1 = {
  floor7: [
    { top: 0, left: 0 },
    { top: 0, left: 1 },
    { top: 0, left: 2 },
    { top: 0, left: 3 },
    { top: 0, left: 4 },
    { top: 1, left: 0 },
    { top: 1, left: 1 },
    { top: 1, left: 2 },
    { top: 1, left: 3 },
    { top: 1, left: 4 },
    { top: 1, left: 8 },
    { top: 1, left: 9 },
    { top: 1, left: 10 },
    { top: 1, left: 11 },
    { top: 1, left: 12 },
    { top: 1, left: 13 },
    { top: 1, left: 14 },
    { top: 0, left: 8 },
    { top: 0, left: 9 },
    { top: 0, left: 10 },
    { top: 0, left: 11 },
    { top: 0, left: 12 },
    { top: 0, left: 13 },
    { top: 0, left: 14 },
    { top: 2, left: 0 },
    { top: 2, left: 1 },
    { top: 2, left: 2 },
    { top: 2, left: 3 },
    { top: 2, left: 4 },
    { top: 2, left: 8 },
    { top: 2, left: 9 },
    { top: 2, left: 10 },
    { top: 2, left: 11 },
    { top: 2, left: 12 },
    { top: 2, left: 13 },
    { top: 2, left: 14 },
    { top: 3, left: 0 },
    { top: 3, left: 1 },
    { top: 3, left: 2 },
    { top: 3, left: 3 },
    { top: 3, left: 4 },
    { top: 3, left: 8 },
    { top: 3, left: 9 },
    { top: 3, left: 10 },
    { top: 3, left: 11 },
    { top: 3, left: 12 },
    { top: 3, left: 13 },
    { top: 3, left: 14 },
    { top: 4, left: 0 },
    { top: 4, left: 1 },
    { top: 4, left: 2 },
    { top: 4, left: 3 },
    { top: 4, left: 4 },
    { top: 4, left: 8 },
    { top: 4, left: 9 },
    { top: 4, left: 13 },
    { top: 4, left: 14 },
    { top: 5, left: 8 },
    { top: 5, left: 9 },
    { top: 5, left: 13 },
    { top: 5, left: 14 },
    { top: 6, left: 13 },
    { top: 6, left: 14 },
    { top: 7, left: 0 },
    { top: 7, left: 1 },
    { top: 7, left: 2 },
    { top: 7, left: 3 },
    { top: 7, left: 4 },
    { top: 7, left: 5 },
    { top: 7, left: 6 },
    { top: 7, left: 7 },
    { top: 7, left: 10 },
    { top: 7, left: 11 },
    { top: 7, left: 12 },
    { top: 7, left: 13 },
    { top: 7, left: 14 },
    { top: 8, left: 0 },
    { top: 8, left: 1 },
    { top: 8, left: 2 },
    { top: 8, left: 3 },
    { top: 8, left: 4 },
    { top: 8, left: 5 },
    { top: 8, left: 6 },
    { top: 8, left: 7 },
    { top: 8, left: 10 },
    { top: 8, left: 11 },
    { top: 8, left: 12 },
    { top: 8, left: 13 },
    { top: 8, left: 14 },
    { top: 9, left: 0 },
    { top: 9, left: 1 },
    { top: 9, left: 2 },
    { top: 9, left: 3 },
    { top: 9, left: 4 },
    { top: 9, left: 5 },
    { top: 9, left: 6 },
    { top: 9, left: 7 },
    { top: 9, left: 10 },
    { top: 9, left: 11 },
    { top: 9, left: 12 },
    { top: 9, left: 13 },
    { top: 9, left: 14 },
  ],
  tree3: [{ top: 0, left: 0 }],
  floor1: [
    { top: 0, left: 6 },
    { top: 1, left: 6 },
    { top: 2, left: 6 },
    { top: 3, left: 6 },
    { top: 4, left: 6 },
    { top: 5, left: 6 },
  ],
  floor3: [
    { top: 0, left: 5 },
    { top: 1, left: 5 },
    { top: 2, left: 5 },
    { top: 3, left: 5 },
    { top: 4, left: 5 },
    { top: 7, left: 8 },
    { top: 8, left: 8 },
    { top: 9, left: 8 },
  ],
  tree4: [{ top: 2, left: 0 }],
  floor4: [{ top: 5, left: 5 }],
  floor5: [
    { top: 5, left: 0 },
    { top: 6, left: 8 },
  ],
  floor6: [
    { top: 6, left: 0 },
    { top: 6, left: 2 },
    { top: 6, left: 4 },
  ],
  floor8: [
    { top: 5, left: 1 },
    { top: 5, left: 3 },
  ],
  floor9: [
    { top: 4, left: 7 },
    { top: 6, left: 7 },
  ],
  floor11: [
    { top: 5, left: 7 },
    { top: 9, left: 9 },
    { top: 6, left: 9 },
    { top: 7, left: 9 },
    { top: 8, left: 9 },
    { top: 4, left: 7 },
    { top: 3, left: 7 },
    { top: 2, left: 7 },
    { top: 1, left: 7 },
    { top: 0, left: 7 },
  ],
  floor12: [{ top: 6, left: 9 }],
  house1: [
    { top: 7, left: 0 },
    { top: 7, left: 4 },
  ],
  waterpool: [{ top: 4, left: 10 }],
  floor2: [{ top: 6, left: 6 }],
  tree2: [
    { top: 0, left: 9 },
    { top: 0, left: 12 },
  ],
};
const wrapperWidth = '920';
const wrapperHeight = '680';
const mapBorder = '100';
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
  background-position: -767px -833px;
  background-size: 2048px 1088px;
  background-image: url(/images/animals/gold_0.png);
  color: black;
`;
const MapImage = styled.div`
  position: absolute;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  background-position: ${(props) => props.backgroundPosition};
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
  const [direction, setDirection] = useState('down');
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
      let canMove = true;

      switch (e.key) {
        case 'ArrowUp':
          if (
            position.top ===
            wrapperHeight / 2 - mapBorder - playerHeight / 2
          ) {
            canMove = false;
          }
          if (canMove) move.top = 10;
          setDirection('up');
          break;
        case 'ArrowDown':
          if (
            position.top ===
            (wrapperHeight / 2 - mapBorder - playerHeight / 2) * -1
          ) {
            canMove = false;
          }
          if (canMove) move.top = -10;
          setDirection('down');
          break;
        case 'ArrowLeft':
          if (
            position.left ===
            wrapperWidth / 2 - mapBorder - playerWidth / 2
          ) {
            canMove = false;
          }
          if (canMove) move.left = 10;
          setDirection('left');
          break;
        case 'ArrowRight':
          if (
            position.left ===
            (wrapperWidth / 2 - mapBorder - playerWidth / 2) * -1
          ) {
            canMove = false;
          }
          if (canMove) move.left = -10;
          setDirection('right');
          break;
        default:
          return;
      }

      if (canMove) {
        setCurrentFrame(
          (prevFrame) => (prevFrame + 1) % framesXPositions.length
        );
        dispatchPosition({ type: 'move', payload: move });
        const absolutePosition = playerPosToAbsolute({
          top: position.top + move.top,
          left: position.left + move.left,
        });
        await updatePlayerPosition(playerName, {
          ...absolutePosition,
          direction: e.key.includes('Arrow')
            ? e.key.slice(5).toLowerCase()
            : '',
          frame: currentFrame,
        });
      }
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
  const getItemStyles = (itemName) => {
    const item = mapIndex[itemName];
    if (!item) return {};

    const width = item.width * 48;
    const height = item.height * 48;
    const backgroundPositionX = item.x * 48;
    const backgroundPositionY = item.y * 48;

    return {
      width,
      height,
      backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
    };
  };
  return (
    <>
      <BaseGlobalStyle />
      {/* <Wrapper>
        {Object.keys(map1).map((itemType) =>
          map1[itemType].map((position, index) => {
            const itemStyles = getItemStyles(itemType);
            return (
              <MapImage
                key={`${itemType}-${index}`}
                width={`${itemStyles.width}px`}
                height={`${itemStyles.height}px`}
                left={`${position.left * 48}px`}
                top={`${position.top * 48}px`}
                backgroundPosition={itemStyles.backgroundPosition}
              />
            );
          })
        )}
      </Wrapper> */}
      {playerName && (
        <Wrapper>
          {position && (
            <Map1 position={position}>
              {otherPlayers &&
                otherPlayers.map((player) => (
                  <OtherPlayer
                    style={{
                      top: `${player.position.top}px`,
                      left: `${player.position.left}px`,
                      backgroundPosition: `${
                        framesXPositions[player.position.frame]
                      } ${directionYPositions[player.position.direction]}`,
                    }}
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

function Map1({ position }) {
  const getItemStyles = (itemName) => {
    const item = mapIndex[itemName];
    if (!item) return {};

    const width = item.width * 48;
    const height = item.height * 48;
    const backgroundPositionX = item.x * 48;
    const backgroundPositionY = item.y * 48;

    return {
      width,
      height,
      backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
    };
  };
  return (
    <Map $top={`${position.top}px`} $left={`${position.left}px`}>
      {Object.keys(map1).map((itemType) =>
        map1[itemType].map((position, index) => {
          const itemStyles = getItemStyles(itemType);
          return (
            <MapImage
              key={`${itemType}-${index}`}
              width={`${itemStyles.width}px`}
              height={`${itemStyles.height}px`}
              left={`${position.left * 48}px`}
              top={`${position.top * 48}px`}
              backgroundPosition={itemStyles.backgroundPosition}
            />
          );
        })
      )}
    </Map>
  );
}
