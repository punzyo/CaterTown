import { AudioTrack } from '@livekit/components-react';
import { useAudioTracks } from '@/utils/hooks/useFilteredTracks';
import { NearbyPlayer } from '@/types';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-react';
import { isTrackReference } from '@livekit/components-react';
interface AudioManagerProps {
  isLocal: boolean;
  nearbyPlayers: NearbyPlayer[];
  audioVolume: { [key: string]: number };
}
export default function AudioManager({
  isLocal,
  nearbyPlayers,
  audioVolume,
}: AudioManagerProps) {
  const audioTracks = useAudioTracks(isLocal, nearbyPlayers);
  return (
    <>
      {audioTracks.map((track: TrackReferenceOrPlaceholder) => {
        if (isTrackReference(track)) {
          return (
            <AudioTrack
              key={track.participant.sid}
              trackRef={track}
              volume={audioVolume[track.participant.identity]}
            />
          );
        }
        return null
      })}
    </>
  );
}
