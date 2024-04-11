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
    x: 10,
    y: -2,
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
  },floor11: {
    width: 1,
    height: 1,
    x: 13,
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
    height: 3,
    x: 10,
    y: -12,
  },
  tree3:{
    width: 5,
    height: 3,
    x: 10,
    y: -15,
  }
};
const map1 = [{item:"tree3",position:{top:0,left:0}}]
const wrapperWidth = '1400';
const wrapperHeight = '1000';
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
  width: 240px;
  height: 144px;
  left: 0;
  top: 0;
  background-position: 480px -720px;
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

  return (
    <>
      <BaseGlobalStyle />
      {map1.map()}
      {/* {playerName && (
        <Wrapper>
          {position && (
            <Map
              // style={{ top: `${position.top}px`, left: `${position.left}px` }}
              $top={`${position.top}px`} $left={`${position.left}px`}
            >
              {otherPlayers &&
                otherPlayers.map((player) => (
                  <OtherPlayer
                    style={{
                      top: `${player.position.top}px`,
                      left: `${player.position.left}px`,
                      backgroundPosition: `${framesXPositions[player.position.frame]} ${directionYPositions[player.position.direction]}`
                    }}
                    key={player.name}
                  >
                    {player.name}
                  </OtherPlayer>
                ))}
            </Map>
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
      </button> */}
    </>
  );
}

export default App;
