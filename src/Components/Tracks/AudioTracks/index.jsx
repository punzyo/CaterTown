import { AudioTrack } from '@livekit/components-react';
import { useAudioTracks } from '../../../utils/hooks/useFilteredTracks';

export default function AudioManager({ isLocal, nearbyPlayers, audioVolume }) {
  const audioTracks = useAudioTracks(isLocal, nearbyPlayers);

  return (
    <>
      {audioTracks.map((track) => {
        return (
          <AudioTrack
            key={track.sid}
            trackRef={track}
            volume={audioVolume[track.participant.identity]}
          />
        );
      })}
    </>
  );
}
