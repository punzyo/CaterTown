import styled from 'styled-components';
import PRMark from '../../../../PRMark';
import { playerWidth, playerHeight } from '../map2';
import {
  catsXPositions,
  catsYPositions,
} from '../../../../../assets/charNames';
const Wrapper = styled.div`
  position: absolute;
  width: ${playerWidth}px;
  height: ${playerHeight}px;
  left: ${(props) =>
    props.$isCurrentPlayer
      ? `calc(50% - ${playerWidth / 2}px)`
      : `${props.$left}px`};

  top: ${(props) =>
    props.$isCurrentPlayer
      ? `calc(50% - ${playerHeight / 2}px)`
      : `${props.$top}px`};
  background-position: ${(props) => props.$backgroundPosition};
  background-size: 2048px 1088px;
  background-image: url(/images/animals/${(props) => props.$character}.png);
  color: black;
  transition: top 0.2s, left 0.2s;
  z-index: 10;
  &::after {
    content: '${(props) => props.$charName}';
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 2px;
    bottom: -5px;
    height: 16px;
    color: black;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
`;
export default function Player({
  character,
  charName,
  left,
  top,
  frame,
  direction,
  isCurrentPlayer,
  permissionLevel,
  githubId,
  pullRequests,
}) {
  const characterImage = `/images/animals/${character}.png`;
  const backgroundPosition = `${catsXPositions[frame]} ${catsYPositions[direction]}`;

  return (
    <Wrapper
      style={{
        backgroundPosition: backgroundPosition,
        backgroundImage: `url(${characterImage})`,
      }}
      $isCurrentPlayer={isCurrentPlayer}
      $left={left}
      $top={top}
      $charName={charName}
      $character={character}
    >
      {isCurrentPlayer || permissionLevel !== 'member' ? (
        <PRMark githubId={githubId} pullRequests={pullRequests} />
      ) : null}
    </Wrapper>
  );
}
