import { useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
export default function TracksManager({ isLocal, children, nearbyPlayers }) {
  const cameraTracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false }
  ).filter((track) =>
    isLocal
      ? track.participant.isLocal
      : !track.participant.isLocal &&
        nearbyPlayers.includes(track.participant.identity)
  );

  const screenShareTracks = useTracks(
    [{ source: Track.Source.ScreenShare, withPlaceholder: true }],
    { onlySubscribed: false }
  ).filter(
    (track) =>
      track.publication &&
      (isLocal
        ? track.participant.isLocal
        : !track.participant.isLocal &&
          nearbyPlayers.includes(track.participant.identity))
  );

  const finalTracks = cameraTracks.map((cameraTrack) => {
    const screenShareTrack = screenShareTracks.find(
      (ssTrack) =>
        ssTrack.participant.identity === cameraTrack.participant.identity
    );
    return screenShareTrack ? screenShareTrack : cameraTrack;
  });

  return children(finalTracks);
}
