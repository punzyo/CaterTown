import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BaseGlobalStyle from './BaseGlobalStyle';

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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [playerPosition, setPlayerPosition] = useState({ top: 100, left: 100 });
  useEffect(() => {
    const handleKeyPress = (e) => {
      const { key } = e;
      const moveAmount = 10;
      switch (key) {
        case 'ArrowUp':
          setPosition((pos) => ({ ...pos, top: pos.top + moveAmount }));
          playerPosToAbsolute({
            left: position.left,
            top: position.top + moveAmount,
          });
          break;
        case 'ArrowDown':
          setPosition((pos) => ({ ...pos, top: pos.top - moveAmount }));
          playerPosToAbsolute({
            left: position.left,
            top: position.top - moveAmount,
          });
          break;
        case 'ArrowLeft':
          setPosition((pos) => ({ ...pos, left: pos.left + moveAmount }));
          playerPosToAbsolute({
            left: position.left + moveAmount,
            top: position.top,
          });
          break;
        case 'ArrowRight':
          setPosition((pos) => ({ ...pos, left: pos.left - moveAmount }));
          playerPosToAbsolute({
            left: position.left - moveAmount,
            top: position.top,
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position]);

  const playerPosToAbsolute = (position) => {
    const absoluteLeft =
      wrapperWidth / 2 - playerWidth / 2 - mapBorder - position.left;
    const absoluteTop =
      wrapperHeight / 2 - playerHeight / 2 - mapBorder - position.top;
    console.log(absoluteLeft, absoluteTop);
  };
  return (
    <>
      <BaseGlobalStyle />
      <Wrapper>
        <Map style={{ top: `${position.top}px`, left: `${position.left}px` }}>
          <OtherPlayer
            style={{
              top: `${playerPosition.top}px`,
              left: `${playerPosition.left}px`,
            }}
          />
        </Map>
        <Player></Player>
      </Wrapper>
    </>
  );
}

export default App;
