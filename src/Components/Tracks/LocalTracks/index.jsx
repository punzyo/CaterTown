import styled from 'styled-components';
import { useState } from 'react';
import {
  TrackLoop,
  VideoTrack,
  TrackRefContext,ConnectionQualityIndicator  
} from '@livekit/components-react';
import VideoContainer from '../VedioContainer'
import FullscreenButton from '../../FullscreenButton';
const TracksWrapper = styled.div`
display: flex;
justify-content: center;
  width: 150px;
  height: 95%;
  >div{
    width: 130px;
    height: 100%;
  }
`;

export default function LocalTracks({ tracks }) {
  console.log(tracks);
  const [fullScreenTrack, setFullScreenTrack] = useState(null);
  return (
    <TracksWrapper>
      <TrackLoop tracks={tracks}>
        <TrackRefContext.Consumer>
          {(trackRef) =>
            trackRef && (

                <VideoContainer
                  isSpeaking={trackRef.participant.isSpeaking}
                  isFullScreen={
                    fullScreenTrack === trackRef.participant.identity
                  }
                  clickFunc={() => {
                    if (fullScreenTrack === trackRef.participant.identity) {
                      setFullScreenTrack(null);
                    } else {
                      setFullScreenTrack(trackRef.participant.identity);
                    }
                  }}
                  isLocal={true}
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
