import styled from 'styled-components';
import FullscreenButton from '../../FullscreenButton';
import { ConnectionQualityIndicator } from '@livekit/components-react';
export const Wrapper = styled.div`
  position: ${(props) => (props.$isFullScreen ? 'fixed' : 'relative')};
  width: ${(props) =>
    props.$isFullScreen ? 'calc(100vw - 300px) !important' : '100%'} ;
  height: ${(props) =>
    props.$isFullScreen ? 'calc(100vh - 100px) !important' : '100px'} ;
  border: 1px solid ${(props) => (props.$isSpeaking ? 'blue' : 'black')};
  left: ${(props) =>
    props.$isFullScreen ? (props.$isLocal ? '0px' : '-430px') : ''};
  top: ${(props) =>
    props.$isFullScreen ? (props.$isLocal ? '0px' : '-309px') : ''};
  border-radius: 5px;
  z-index: ${(props) => (props.$isFullScreen ? '15' : '5')};
  .lk-participant-media-video {
    width: 100%;
    border-radius: 5px;
  }
  .name {
    position: absolute;
    left: 5px;
    top: 5px;
    opacity: 0.9;
    background-color: rgba(255, 255, 255, 0.2);
    white-space: nowrap;
    font-size: ${(props) => (props.$isFullScreen ? '40px' : '12px')};
    padding: 0px 5px;
    border-radius: 5px;
  }
  .lk-connection-quality{
    position: absolute;
    right:  ${(props) =>
    props.$isFullScreen ? '5px' : '-5px'};
    top: ${(props) =>
    props.$isFullScreen ? '25px' : '5px'};
    opacity: 0.2;
    transform: ${(props) => (props.$isFullScreen ? 'scale(2)' : '')};
  svg{
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    g{
      width: 100%;
    height: 100%;
    }
  }
  }
`;

export default function VedioContainer({
  isSpeaking,
  isFullScreen,
  children,
  clickFunc,
  isLocal,
}) {
  return (
    <Wrapper
      $isSpeaking={isSpeaking}
      $isFullScreen={isFullScreen}
      $isLocal={isLocal}
    >
       <ConnectionQualityIndicator />
      {children}
      <FullscreenButton isFullScreen={isFullScreen} clickFunc={clickFunc} />
    </Wrapper>
  );
}
