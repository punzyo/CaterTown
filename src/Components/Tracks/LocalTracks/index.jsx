import styled from 'styled-components';
import { useState } from 'react';
import {
  TrackLoop,
  VideoTrack,
  TrackRefContext,
} from '@livekit/components-react';
import VideoContainer from '../VedioContainer';
import { useGameSettings } from '../../../utils/zustand';
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

export default function LocalTracks({ tracks }) {
  const { setIsFullScreen } = useGameSettings();
  const [fullScreenTrack, setFullScreenTrack] = useState(null);
  return (
    <TracksWrapper>
      <TrackLoop tracks={tracks}>
        <TrackRefContext.Consumer>
          {(trackRef) =>
            trackRef && (
              <VideoContainer
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