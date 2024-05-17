import { Track } from 'livekit-client';
import { AudioTrack } from '@livekit/components-react';
import { usePlayerTracks } from '../../../utils/zustand';

export default function AudioManager({
  isLocal,
  nearbyPlayers,
  audioVolume,
}) {
  const { allTracks } = usePlayerTracks();
  const audioTracks = allTracks
    .filter((track) => track.source === Track.Source.Microphone)
    .filter((track) =>
      isLocal
        ? track.participant.isLocal
        : !track.participant.isLocal &&
          nearbyPlayers.some(
            (player) => player.charName === track.participant.identity
          )
    );

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
