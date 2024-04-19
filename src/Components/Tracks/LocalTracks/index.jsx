import styled from 'styled-components';
import { CarouselLayout, ParticipantTile } from '@livekit/components-react';
const TracksWrapper = styled.div`
  width: 150px;
  height: 90%;

`;
export function LocalTracks({ tracks }) {
  return (
    <TracksWrapper>
      <CarouselLayout tracks={tracks} style={{ height: 'auto' }}>
        <ParticipantTile />
      </CarouselLayout>
    </TracksWrapper>
  );
}
