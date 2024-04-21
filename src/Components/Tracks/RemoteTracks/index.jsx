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
import  VideoContainer  from '../VedioContainer';
import FullscreenButton from '../../FullscreenButton';

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

export default function RemoteTracks({ tracks, nearbyPlayers }) {
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
    <Wrapper>
      <TrackLoop tracks={tracks}>
        <TrackRefContext.Consumer>
          {(trackRef) =>
            trackRef && (
              <>
                <VideoContainer
                isSpeaking={trackRef.participant.isSpeaking}
                  isFullScreen={
                    fullScreenTrack === trackRef.participant.identity
                  }
                  clickFunc={() => {
                    if (fullScreenTrack) {
                      setFullScreenTrack(null);
                    } else {
                      setFullScreenTrack(trackRef.participant.identity);
                    }
                  }}
                  isLocal={false}
                >
                  {console.log('3333333333333333', trackRef)}
                  <VideoTrack
                    trackRef={trackRef}
                    ref={refs.current[trackRef.participant.identity]}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    defaultValue="1"
                    onChange={(e) => {
                      console.log(
                        trackRef.participant.identity,
                        'WWW',
                        e.target.value
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
                  <span className="name">{trackRef.participant.identity}</span>
                </VideoContainer>
              </>
            )
          }
        </TrackRefContext.Consumer>
      </TrackLoop>
      <AudioManager
        isLocal={false}
        nearbyPlayers={nearbyPlayers}
        audioVolume={audioVolume}
      />
    </Wrapper>
  );
}
