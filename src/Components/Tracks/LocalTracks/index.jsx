import styled from 'styled-components';
import { CarouselLayout, ParticipantTile } from '@livekit/components-react';
const VideoTracks = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid red;
`;
export function LocalTracks({ tracks }) {
  return (
    <VideoTracks>
      <CarouselLayout tracks={tracks} style={{ height: 'auto' }}>
        <ParticipantTile />
      </CarouselLayout>
    </VideoTracks>
  );
}
