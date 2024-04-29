import styled from 'styled-components';
import FullscreenButton from '../../Buttons/FullscreenButton';
import { ConnectionQualityIndicator } from '@livekit/components-react';
import { useGameSettings } from '../../../utils/zustand';
export const Wrapper = styled.div`
  position: ${(props) => (props.$isFullScreen ? 'fixed' : 'relative')};
  width: ${(props) =>
    props.$isFullScreen ? props.$showSidebar?'calc(100vw - 300px) !important':'100vw !important' : '100%'};
  height: ${(props) =>
    props.$isFullScreen ? 'calc(100vh - 100px) !important' : '100px'};
  border: 1px solid ${(props) => (props.$isSpeaking ? 'blue' : 'black')};
  left: 0;
  top: 0;
  border-radius: 5px;
  z-index: ${(props) => (props.$isFullScreen ? '15' : '5')};
  transition:  width 0.3s ease-in-out;
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
    font-size: ${(props) => (props.$isFullScreen ? '40px' : '12px')};
    padding: 0px 5px;
    border-radius: 5px;
  }
  .lk-connection-quality {
    position: absolute;
    right: ${(props) => (props.$isFullScreen ? '5px' : '-5px')};
    top: ${(props) => (props.$isFullScreen ? '25px' : '5px')};
    opacity: 0.2;
    transform: ${(props) => (props.$isFullScreen ? 'scale(2)' : '')};
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
export default function VedioContainer({
  isSpeaking,
  isFullScreen,
  children,
  clickFunc,
  hidePlaceholder,
}) {
  const { showSidebar } = useGameSettings();
  return (
    <Wrapper
      $isSpeaking={isSpeaking}
      $isFullScreen={isFullScreen}
      $showSidebar={showSidebar}
    >
      <ConnectionQualityIndicator />
      {children}
      <FullscreenButton isFullScreen={isFullScreen} clickFunc={clickFunc} />
      {!hidePlaceholder && (
        <Placeholder>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
        </Placeholder>
      )}
    </Wrapper>
  );
}
