import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BaseGlobalStyle from './BaseGlobalStyle';
const Wrapper = styled.div`
    position: relative;
    width: 1000px;
    height: 1000px;
    border: 1px solid;
  `;
  const Map = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border: 100px solid gray;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    transition: top 0.2s, left 0.2s;
  `;
  const Player = styled.div`
    position: absolute;
    top: 600px;
    left: 600px;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 1px solid;
    background-color: black;
  `;
function App() {
  

  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    const handleKeyPress = (e) => {
      const { key } = e;
      const moveAmount = 10; 
      switch(key) {
        case 'ArrowUp':
          setPosition(pos => ({ ...pos, top: pos.top + moveAmount }));
          break;
        case 'ArrowDown':
          setPosition(pos => ({ ...pos, top: pos.top - moveAmount }));
          break;
        case 'ArrowLeft':
          setPosition(pos => ({ ...pos, left: pos.left + moveAmount }));
          break;
        case 'ArrowRight':
          setPosition(pos => ({ ...pos, left: pos.left - moveAmount }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  return (
    <>
      <BaseGlobalStyle />
      <Wrapper>
        <Map top={position.top} left={position.left}>

        </Map>
        <Player></Player>
      </Wrapper>
    </>
  );
}

export default App;
