import styled from 'styled-components';
import { CarouselLayout, ParticipantTile } from '@livekit/components-react';
const VideoTracks = styled.div`
position: relative;
  .lk-carousel {
    position: absolute;
    top:-200px;
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
export default function RemoteTracks({ tracks }) {
  return (
    <VideoTracks>
      <CarouselLayout tracks={tracks} style={{ height: 'auto' }}>
        <ParticipantTile />
      </CarouselLayout>
    </VideoTracks>
  );
}
import { TrackLoop } from '@livekit/components-react';

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5列 */
  gap: 10px;
  background-color: #2196f3;
  padding: 10px;

  > div {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px;
    font-size: 30px;
  }
`;

export function MyCarouselLayout({ tracks, ...props }) {
  return (
    <aside className="lk-carousel" {...props}>
      <TrackLoop tracks={tracks}>{props.children}</TrackLoop>
    </aside>
  );
}
