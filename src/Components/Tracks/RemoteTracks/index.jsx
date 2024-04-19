import styled from 'styled-components';
import { useRef } from 'react';
import {
    CarouselLayout,
    ParticipantTile,
  } from '@livekit/components-react';
  const VideoTracks = styled.div`
  width: 800px;
  height: 100px;
  border: 1px solid red;
`;
export default function RemoteTracks({tracks}) {

    return (
      <VideoTracks>
      <MyGridLayout tracks={tracks} style={{ height: 'auto' }}>
        <ParticipantTile />
      </MyGridLayout>
      </VideoTracks>
    );
  }
  import { TrackLoop } from '@livekit/components-react';

/** @public */


/**
 * The `GridLayout` component displays a list of tracks in a grid container.
 * It will display tracks in a defined grid layout.
 * @example
 * ```tsx
 * const tracks = useTracks([Track.Source.Camera]);
 * <GridLayout tracks={tracks}>
 *   <ParticipantTile />
 * </GridLayout>
 * ```
 * @public
 */
const YOYO = styled.div`
  .grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5列 */
  gap: 10px;
  background-color: #2196F3;
  padding: 10px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px;
  font-size: 30px;
}
`
export function MyGridLayout({ tracks, ...props }) {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <YOYO ref={gridRef} className="grid-container" {...props}>
      <TrackLoop tracks={tracks}>
        {props.children}
      </TrackLoop>
    </YOYO>
  );
}