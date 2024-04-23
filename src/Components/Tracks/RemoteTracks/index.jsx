import styled from 'styled-components';
import {
  CarouselLayout,
  ParticipantTile,
  VideoTrack,
  TrackLoop,
  TrackRefContext,
  AudioVisualizer,
  AudioTrack,
} from '@livekit/components-react';
import React, { useRef, useState, useEffect } from 'react';
import AudioManager from '../../TracksManager/AudioTracks';
import VideoContainer from '../VedioContainer';
import { useGameSettings } from '../../../utils/zustand';
import MemberIcon from '../../MemberIcon';
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
    grid-column: 2 / 5;
    grid-row: 2/ 4;
  }
  > div:nth-child(2) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
  > div:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  > div:nth-child(4) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
  }

  > div:nth-child(5) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  > div:nth-child(6) {
    grid-column: 5/ 6;
    grid-row: 1 / 2;
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
const AudioController = styled.input`
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  background-color: black;
  border-radius: 10px;
  width: 100px;
  width: 80px;
  opacity: 0.1;
  position: absolute;
  z-index: 2;
  bottom: 5px;
  left: 5px;
  &:hover {
    opacity: 0.8;
  }
  &::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 10px;
    background: #888;
    cursor: pointer;
  }
  &::before {
    width: ${(props) => props.$widthPercent}%;
    height: 8px;
    border-radius: 10px;
    content: '';
    position: absolute;
    left: 0px;
    background: #eee;
  }
  &::-webkit-slider-thumb {
    position: relative;
    bottom: 3px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #fff !important;
    cursor: pointer;
  }
`;
const MemberIconWrapper = styled.div`
  background-color: inherit;
  border-radius: 50%;

  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  >div>div{
    width:25px;
    height:25px;
    transform:scale(0.8);
    background-position: -785px -75px;
  }
`;
export default function RemoteTracks({ tracks, nearbyPlayers }) {
  const { isFullScreen, setIsFullScreen } = useGameSettings();
  const [fullScreenTrack, setFullScreenTrack] = useState('');
  const refs = useRef({});
  const [audioVolume, setAudioVolume] = useState({});

  useEffect(() => {
    tracks.forEach((track) => {
      if (!refs.current[track.participant.identity]) {
        refs.current[track.participant.identity] = React.createRef();
      }
    });
  }, [tracks]);
  return (
    <>
      <Wrapper>
        <div></div>
        <TrackLoop tracks={tracks}>
          <TrackRefContext.Consumer>
            {(trackRef) =>
              trackRef &&
              (trackRef.participant.isCameraEnabled ||
                trackRef.participant.isScreenShareEnabled ||
                trackRef.participant.isMicrophoneEnabled) && (
                <>
                  <VideoContainer
                    hidePlaceholder={
                      trackRef.participant.isCameraEnabled ||
                      trackRef.participant.isScreenShareEnabled
                    }
                    isSpeaking={trackRef.participant.isSpeaking}
                    isFullScreen={
                      fullScreenTrack === trackRef.participant.identity
                    }
                    clickFunc={() => {
                      if (fullScreenTrack) {
                        setFullScreenTrack(null);
                        setIsFullScreen(false);
                      } else {
                        setFullScreenTrack(trackRef.participant.identity);
                        setIsFullScreen(true);
                      }
                    }}
                  >
                    {console.log('3333333333333333', trackRef)}
                    <VideoTrack
                      trackRef={trackRef}
                      ref={refs.current[trackRef.participant.identity]}
                    />

                    <AudioController
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      defaultValue="1"
                      $widthPercent={
                        audioVolume[trackRef.participant.identity] * 100
                      }
                      onChange={(e) => {
                        console.log(
                          trackRef.participant.identity,
                          'WWW',
                          audioVolume[trackRef.participant.identity]
                        );
                        setAudioVolume((prevAudioVolume) => {
                          return {
                            ...prevAudioVolume,
                            [trackRef.participant.identity]: parseFloat(
                              e.target.value
                            ),
                          };
                        });
                      }}
                    />
                    {!isFullScreen && <MemberIconWrapper>
                      <MemberIcon
                        image={
                          nearbyPlayers.find(
                            (player) =>
                              player.charName === trackRef.participant.identity
                          )?.character
                        }
                        isOnline={null}
                      />
                    </MemberIconWrapper>}
                    <span className="name">
                      {trackRef.participant.identity}
                    </span>
                  </VideoContainer>
                </>
              )
            }
          </TrackRefContext.Consumer>
        </TrackLoop>
      </Wrapper>
      <AudioManager
        isLocal={false}
        nearbyPlayers={nearbyPlayers}
        audioVolume={audioVolume}
      />
    </>
  );
}
