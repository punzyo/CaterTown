import { Track } from 'livekit-client';
import { useTracks } from '@livekit/components-react';
import { usePlayerTracks } from '../../../utils/zustand';

const TracksProvider = ({children}) => {
  const { setTracks } = usePlayerTracks();
  const allTracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true },
    ],
    { onlySubscribed: false }
  );

  

  return <>{children}</>;
};

export default TracksProvider;
