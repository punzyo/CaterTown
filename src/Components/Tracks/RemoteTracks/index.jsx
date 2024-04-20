import styled from 'styled-components';
import {
  CarouselLayout,
  ParticipantTile,
  VideoTrack,
  TrackLoop,
  TrackRefContext,
  AudioVisualizer,
  AudioTrack 
} from '@livekit/components-react';
import React,{ useRef, useState, useEffect } from 'react';
const VideoTracks = styled.div`
  position: relative;
  .lk-carousel {
    position: absolute;
    top: -200px;
    left: -360px;
    display: grid;
    grid-template-columns: repeat(5, 130px);
    gap: 30px;
    overflow: visible;
    padding: 10px;
    > div:nth-child(1) {
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    }
    > div:nth-child(2) {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }
    > div:nth-child(3) {
      grid-column: 4 / 5;
      grid-row: 1 / 2;
    }

    > div:nth-child(6) {
      grid-column: 1 / 5;
      grid-row: 2 / 3;
    }

    > div:nth-child(8) {
      grid-column: 1 / 5;
      grid-row: 3 / 4;
    }
    > div:nth-child(9) {
      grid-column: 5 / -1;
      grid-row: 3 / 4;
    }
    > div:nth-child(10) {
      grid-column: 1 / 2;
      grid-row: 4/ 5;
    }
  }

  .lk-carousel > div {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    width: 130px;
    font-size: 20px;
    animation: fadeIn 0.5s ease-out forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
`;
export function RemotTracks({ tracks }) {
  return (
    <VideoTracks>
      <CarouselLayout tracks={tracks} style={{ height: 'auto' }}>
        <ParticipantTile />
      </CarouselLayout>
    </VideoTracks>
  );
}

const VideoContainer = styled.div`
position:  ${(props) => (props.$isFullScreen ? 'fixed' : 'relative')};;
  width: ${(props) => (props.$isFullScreen ? 'calc(100vw - 300px)' : '150px')};
  height: ${(props) => (props.$isFullScreen ? 'calc(100vh - 100px)' : '100px')};
  border: 1px solid ${(props) => (props.$isSpeaking ? 'blue' : '')};
  left: ${(props) => (props.$isFullScreen ? '-430px' : '')};
  top: ${(props) => (props.$isFullScreen ? '-309px' : '')};
  border-radius: 5px;
  z-index: ${(props) => (props.$isFullScreen ? '15' : '10')};
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
`;

const FullscreenButton = styled.button`
  position: absolute;
  right: 5px;
  bottom: 5px;
  opacity: 0.2;
  background-color: inherit;
  color: white;
  border: none;
  width: ${(props) => (props.$isFullScreen ? '50px' : '15px')};
  height: ${(props) => (props.$isFullScreen ? '50px' : '15px')};
  cursor: pointer;
  svg {
    position: absolute;;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    fill: white;
  }
`;

const Wrapper = styled.div`
  position: relative;
  top: -230px;
  left: -415px;
  display: grid;
  grid-template-columns: repeat(5, 150px);
  gap: 30px;
  overflow: visible;
  padding: 10px;
  > div:nth-child(1) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
  > div:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  > div:nth-child(3) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
  }

  > div:nth-child(6) {
    grid-column: 1 / 5;
    grid-row: 2 / 3;
  }

  > div:nth-child(8) {
    grid-column: 1 / 5;
    grid-row: 3 / 4;
  }
  > div:nth-child(9) {
    grid-column: 5 / -1;
    grid-row: 3 / 4;
  }
  > div:nth-child(10) {
    grid-column: 1 / 2;
    grid-row: 4/ 5;
  }
  > div {
    text-align: center;
    font-size: 20px;
    animation: fadeIn 0.5s ease-out forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
`;
const VedioBottom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
position: relative;
top:-105px;
  font-size: 16px;
`;

export default function RemoteTracks({ tracks }) {
  const [fullScreenTrack, setFullScreenTrack] = useState('');
  const refs = useRef({});

  // 初始化每个track的ref
  useEffect(() => {
    tracks.forEach(track => {
      if (!refs.current[track.participant.identity]) {
        refs.current[track.participant.identity] = React.createRef();
      }
    });
  }, [tracks]);
  return (
    <Wrapper>
      <TrackLoop tracks={tracks}>
        <TrackRefContext.Consumer>
          {(trackRef) =>
            trackRef && (
              <>{console.log(trackRef)}
                <VideoContainer
                  $isSpeaking={trackRef.participant.isSpeaking}
                  $isFullScreen={
                    fullScreenTrack === trackRef.participant.identity
                  }
                >
                  <VideoTrack trackRef={trackRef} ref={refs.current[trackRef.participant.identity]} />
                  <AudioTrack trackRef={trackRef} />
                  <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  defaultValue="1"
                  onChange={(e) => {
                    const videoElement = refs.current[trackRef.participant.identity].current;
                    if (videoElement) {
                      console.log(videoElement.muted,e.target.value);
                      videoElement.muted=false;
                      videoElement.volume = parseInt(e.target.value);
                    }
                  }}
                />
                  <span className="name">{trackRef.participant.identity}</span>
       
                    <FullscreenButton
                    $isFullScreen={
                      fullScreenTrack === trackRef.participant.identity
                    }
                      onClick={() => {
                        if (fullScreenTrack) {
                          setFullScreenTrack(null);
                        } else {
                          setFullScreenTrack(trackRef.participant.identity);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" />
                      </svg>
                    </FullscreenButton>
              
                </VideoContainer>
              </>
            )
          }
        </TrackRefContext.Consumer>
      </TrackLoop>
    </Wrapper>
  );
}
