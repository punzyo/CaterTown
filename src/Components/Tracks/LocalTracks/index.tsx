import styled from 'styled-components';
import { useState } from 'react';
import {
  TrackLoop,
  VideoTrack,
  TrackRefContext,
} from '@livekit/components-react';
import VideoContainer from '@/Components/VideoContainer';
import { useGameSettings } from '@/utils/zustand';
import { useLocalTracks } from '@/utils/hooks/useFilteredTracks';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-react';
import { isTrackReference } from '@livekit/components-react';
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
  const tracks = useLocalTracks();
  const { setIsFullScreen } = useGameSettings();
  const [fullScreenTrack, setFullScreenTrack] = useState<string | null>(null);

  return (
    <TracksWrapper>
      <TrackLoop tracks={tracks}>
        <TrackRefContext.Consumer>
          {(trackRef: TrackReferenceOrPlaceholder | undefined) =>
            trackRef &&
            isTrackReference(trackRef) && (
              <VideoContainer
                hidePlaceholder={
                  trackRef.participant.isCameraEnabled ||
                  trackRef.participant.isScreenShareEnabled
                }
                isSpeaking={trackRef.participant.isSpeaking}
                isFullScreen={fullScreenTrack === trackRef.participant.identity}
                onClickFunc={() => {
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
