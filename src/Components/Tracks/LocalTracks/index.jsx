import styled from 'styled-components';
import { useState } from 'react';
import {
  TrackLoop,
  VideoTrack,
  TrackRefContext,
} from '@livekit/components-react';
import VideoContainer from '../../VedioContainer';
import { useGameSettings, usePlayerTracks } from '../../../utils/zustand';
import { Track } from 'livekit-client';
useGameSettings;
const TracksWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 130px;
  height: 95%;
  background-color: black;
  border-radius: 5px;
  > div {
    width: 130px;
    height: 100%;
  }
`;

export default function LocalTracks() {
  const { allTracks } = usePlayerTracks();
  const objTracks = allTracks?.reduce((acc, track) => {
    const participantIdentity = track.participant.identity;
    if (track.participant.isLocal) {
      if (track.source === Track.Source.ScreenShare && track.publication) {
        acc[participantIdentity] = track;
      } else if (
        track.source === Track.Source.Camera &&
        !acc[participantIdentity]
      ) {
        acc[participantIdentity] = track;
      }
    }
    return acc;
  }, {});
  const tracks = Object.values(objTracks);
  const { setIsFullScreen } = useGameSettings();
  const [fullScreenTrack, setFullScreenTrack] = useState(null);

  return (
    <TracksWrapper>
      <TrackLoop tracks={tracks}>
        <TrackRefContext.Consumer>
          {(trackRef) =>
            trackRef && (
              <VideoContainer
                hidePlaceholder={
                  trackRef.participant.isCameraEnabled ||
                  trackRef.participant.isScreenShareEnabled
                }
                isSpeaking={trackRef.participant.isSpeaking}
                isFullScreen={fullScreenTrack === trackRef.participant.identity}
                clickFunc={() => {
                  if (fullScreenTrack === trackRef.participant.identity) {
                    setFullScreenTrack(null);
                    setIsFullScreen(false);
                  } else {
                    setFullScreenTrack(trackRef.participant.identity);
                    setIsFullScreen(true);
                  }
                }}
              >
                <VideoTrack trackRef={trackRef} />
              </VideoContainer>
            )
          }
        </TrackRefContext.Consumer>
      </TrackLoop>
    </TracksWrapper>
  );
}
