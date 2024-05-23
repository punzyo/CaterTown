import { Track } from 'livekit-client';
import { useTracks } from '@livekit/components-react';
import { usePlayerTracks } from '@/utils/zustand';
import { useEffect, useMemo } from 'react';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-react';
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
  const allTracks = useTracks(tracks, {
    onlySubscribed: false,
  }) as TrackReferenceOrPlaceholder[];

  useEffect(() => {
    setTracks(allTracks);
  }, [allTracks]);
  return <></>;
};

export default TracksProvider;
