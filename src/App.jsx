import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import BaseGlobalStyle from './BaseGlobalStyle';
import { updatePlayerPosition, getPlayerPosition } from './firebase/firestore';
const wrapperWidth = '1400';
const wrapperHeight = '1000';
const mapBorder = '100';
const playerWidth = '100';
const playerHeight = '100';
const Wrapper = styled.div`
  position: relative;
  width: ${wrapperWidth}px;
  height: ${wrapperHeight}px;
  border: 1px solid;
  overflow: hidden;
  user-select: none;
`;
const Map = styled.div`
  position: relative;
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
  border: 1px solid;
  background-color: black;
`;
const OtherPlayer = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid;
  background-color: black;
`;
function App() {
  const [position, setPosition] = useState(null);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const nameInput = useRef(null);
  useEffect(() => {
    const handleKeyPress = async (e) => {
      let absolutePosition;
      if (!playerName) return;
      console.log('?');
      const { key } = e;
      const moveAmount = 10;
      switch (key) {
        case 'ArrowUp':
          setPosition((pos) => ({ ...pos, top: pos.top + moveAmount }));
          absolutePosition = playerPosToAbsolute({
            left: position.left,
            top: position.top + moveAmount,
          });
          await updatePlayerPosition(playerName, absolutePosition);
          break;
        case 'ArrowDown':
          setPosition((pos) => ({ ...pos, top: pos.top - moveAmount }));
          absolutePosition = playerPosToAbsolute({
            left: position.left,
            top: position.top - moveAmount,
          });
          await updatePlayerPosition(playerName, absolutePosition);
          break;
        case 'ArrowLeft':
          setPosition((pos) => ({ ...pos, left: pos.left + moveAmount }));
          absolutePosition = playerPosToAbsolute({
            left: position.left + moveAmount,
            top: position.top,
          });
          await updatePlayerPosition(playerName, absolutePosition);
          break;
        case 'ArrowRight':
          setPosition((pos) => ({ ...pos, left: pos.left - moveAmount }));
          absolutePosition = playerPosToAbsolute({
            left: position.left - moveAmount,
            top: position.top,
          });
          await updatePlayerPosition(playerName, absolutePosition);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position]);
  useEffect(() => {
    if (!playerName) return;
    const updatePosition = async () => {
      try {
        const playerPosition = await getPlayerPosition(playerName);
        const mapPosition = playerAbsoluteToMapPos(playerPosition);
        setPosition(mapPosition);
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
          {position && <Map style={{ top: `${position.top}px`, left: `${position.left}px` }}>
            {playerPosition &&<OtherPlayer
              style={{
                top: `${playerPosition.top}px`,
                left: `${playerPosition.left}px`,
              }}
            />}
          </Map>}
          {position && <Player></Player>}
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
