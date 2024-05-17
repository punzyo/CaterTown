import { Track } from 'livekit-client';
import { useTracks } from '@livekit/components-react';
import { usePlayerTracks } from '../../../utils/zustand';
import { useEffect, useMemo } from 'react';

const TracksProvider = () => {
  const { setTracks } = usePlayerTracks();
  const tracks = useMemo(
    () => [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true },
    ],
    []
  );
  const allTracks = useTracks(tracks, { onlySubscribed: false });
  //; GG here


  useEffect(() => {
     console.log('provider設置', allTracks);
    setTracks(allTracks);
  }, [allTracks]);
  return <></>;
};

export default TracksProvider;
