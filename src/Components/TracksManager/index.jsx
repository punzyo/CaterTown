import { useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
export default function TracksManager({ isLocal, children, nearbyPlayers }) {
  const allTracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: true }
    ],
    { onlySubscribed: false }
  );
  console.log(allTracks);
  
  const cameraTracks = allTracks.filter(track => 
    track.source === Track.Source.Camera &&
    (isLocal ? track.participant.isLocal : !track.participant.isLocal && nearbyPlayers.includes(track.participant.identity))
  );

  console.log("Filtered camera tracks:", cameraTracks);

  const screenShareTracks = allTracks.filter(track => 
    track.source === Track.Source.ScreenShare && track.publication &&
    (isLocal ? track.participant.isLocal : !track.participant.isLocal && nearbyPlayers.includes(track.participant.identity))
  );

  console.log("Filtered screen share tracks:", screenShareTracks);
  const finalTracks = cameraTracks.map((cameraTrack) => {
    const screenShareTrack = screenShareTracks.find(
      (ssTrack) =>
        ssTrack.participant.identity === cameraTrack.participant.identity
    );
    return screenShareTrack ? screenShareTrack : cameraTrack;
  });
  console.log(finalTracks);
  return children(finalTracks);
}
