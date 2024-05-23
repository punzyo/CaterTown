import styled from 'styled-components';
import PRMark from '@/Components/PRMark';
import { playerWidth, playerHeight } from '../map2';
import { catsXPositions, catsYPositions } from '@/assets/charNames';
import type { PlayerPosition, PlayerType, PullRequests } from '@/types';
interface WrapperProps{
  $isCurrentPlayer: boolean;
  $left: number;
  $top: number;
  $character: string;
  $charName: string;
}
const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  width: ${playerWidth}px;
  height: ${playerHeight}px;
  left: ${({$isCurrentPlayer, $left}) =>
    $isCurrentPlayer
      ? `calc(50% - ${playerWidth / 2}px)`
      : `${$left}px`};

  top: ${(props) =>
    props.$isCurrentPlayer
      ? `calc(50% - ${playerHeight / 2}px)`
      : `${props.$top}px`};
  background-size: 2048px 1088px;
  background-image: url(/images/animals/${({$character}) => $character}.png);
  color: black;
  transition: top 0.2s, left 0.2s;
  z-index: 10;
  &::after {
    content: '${({$charName}) => $charName}';
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
interface PlayerProps
  extends Omit<PlayerType, 'room' | 'position'>,
    PlayerPosition {
  isCurrentPlayer: boolean;
  pullRequests: PullRequests; 
  children?: React.ReactNode;
}
export default function Player({
  userId,
  character,
  charName,
  left,
  top,
  frame,
  direction,
  isCurrentPlayer,
  permissionLevel,
  gitHubId,
  pullRequests,
  children,
}: PlayerProps) {
  const characterImage = `/images/animals/${character}.png`;
  const backgroundPosition = `${catsXPositions[frame]} ${catsYPositions[direction]}`;

  return (
    <Wrapper
      data-testid={userId}
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
        <PRMark gitHubId={gitHubId} pullRequests={pullRequests} />
      ) : null}
      {children}
    </Wrapper>
  );
}
