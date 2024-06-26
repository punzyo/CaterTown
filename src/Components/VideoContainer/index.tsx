import styled from 'styled-components';
import FullscreenButton from '../Buttons/FullscreenButton';
import { ConnectionQualityIndicator } from '@livekit/components-react';
import { useGameSettings } from '@/utils/zustand';
import UserIcon from '../Icons/UserIcon';

interface WrapperProps {
  $isFullScreen: boolean;
  $showSidebar: boolean;
  $isSpeaking: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  position: ${({ $isFullScreen }) => ($isFullScreen ? 'fixed' : 'relative')};
  width: ${({ $isFullScreen, $showSidebar }) =>
    $isFullScreen
      ? $showSidebar
        ? 'calc(100vw - 300px) !important'
        : '100vw !important'
      : '100%'};
  height: ${({ $isFullScreen }) =>
    $isFullScreen ? 'calc(100vh - 100px) !important' : '100px'};
  border: 1px solid ${({ $isSpeaking }) => ($isSpeaking ? 'blue' : 'black')};
  left: 0;
  top: 0;
  border-radius: 5px;
  z-index: ${({ $isFullScreen }) => ($isFullScreen ? '15' : '5')};
  .lk-participant-media-video {
    width: 100%;
    border-radius: 5px;
  }
  .name {
    position: absolute;
    left: 5px;
    top: 5px;
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 0.2);
    white-space: nowrap;
    font-size: ${({ $isFullScreen }) => ($isFullScreen ? '40px' : '12px')};
    padding: 0px 5px;
    border-radius: 5px;
  }
  .lk-connection-quality {
    position: absolute;
    right: ${({ $isFullScreen }) => ($isFullScreen ? '5px' : '-5px')};
    top: ${({ $isFullScreen }) => ($isFullScreen ? '25px' : '5px')};
    opacity: 0.2;
    transform: ${({ $isFullScreen }) => ($isFullScreen ? 'scale(2)' : '')};
    svg {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      g {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  svg {
    width: 70%;
    height: 70%;
    fill: #555;
  }
`;

interface VideoContainerProps {
  isSpeaking: boolean;
  isFullScreen: boolean;
  children: React.ReactNode;
  onClickFunc: () => void;
  hidePlaceholder: boolean;
}

export default function VideoContainer({
  isSpeaking,
  isFullScreen,
  children,
  onClickFunc,
  hidePlaceholder,
}: VideoContainerProps) {
  const { showSidebar } = useGameSettings();
  return (
    <Wrapper
      $isSpeaking={isSpeaking}
      $isFullScreen={isFullScreen}
      $showSidebar={showSidebar}
    >
      <ConnectionQualityIndicator />
      {children}
      <FullscreenButton isFullScreen={isFullScreen} onClickFunc={onClickFunc} />
      {!hidePlaceholder && (
        <Placeholder>
          <UserIcon />
        </Placeholder>
      )}
    </Wrapper>
  );
}
