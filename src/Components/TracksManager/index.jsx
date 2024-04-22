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

  const finalTracks = allTracks.reduce((acc, track) => {
    const participantIdentity = track.participant.identity;
    const isLocalCheck = isLocal ? track.participant.isLocal : !track.participant.isLocal && nearbyPlayers.some(player => player.charName === participantIdentity);
    
    if (isLocalCheck) {
      if (track.source === Track.Source.ScreenShare && track.publication) {
        // Prioritize screenshare track if it's subscribed
        acc[participantIdentity] = track;
      } else if (track.source === Track.Source.Camera && !acc[participantIdentity]) {
        // Store the camera track if no screenshare track has been stored yet
        acc[participantIdentity] = track;
      }
    }
    return acc;
  }, {});
  console.log(Object.values(finalTracks));
  return children(Object.values(finalTracks));
}
// export default function TracksManager({ isLocal, children, nearbyPlayers }) {
//   const allTracks = useTracks(
//     [
//       { source: Track.Source.Camera, withPlaceholder: true },
//       { source: Track.Source.ScreenShare, withPlaceholder: true },
//       { source: Track.Source.Microphone, withPlaceholder: true },
//     ],
//     { onlySubscribed: false }
//   );
//   console.log(allTracks);

//   const cameraTracks = allTracks.filter(
//     (track) =>
//       track.source === Track.Source.Camera &&
//       (isLocal
//         ? track.participant.isLocal
//         : !track.participant.isLocal &&
//           nearbyPlayers.includes(track.participant.identity))
//   );

//   console.log('Filtered camera tracks:', cameraTracks);

//   const screenShareTracks = allTracks.filter(
//     (track) =>
//       track.source === Track.Source.ScreenShare &&
//       track.publication &&
//       (isLocal
//         ? track.participant.isLocal
//         : !track.participant.isLocal &&
//           nearbyPlayers.includes(track.participant.identity))
//   );

//   console.log('Filtered screen share tracks:', screenShareTracks);
//   const videoTracks = cameraTracks.map((cameraTrack) => {
//     const screenShareTrack = screenShareTracks.find(
//       (ssTrack) =>
//         ssTrack.participant.identity === cameraTrack.participant.identity
//     );
//     return screenShareTrack ? screenShareTrack : cameraTrack;
//   });
//   const audioTracks = allTracks.filter(
//     (track) =>
//       track.source === Track.Source.Microphone &&
//       (isLocal
//         ? track.participant.isLocal
//         : !track.participant.isLocal &&
//           nearbyPlayers.includes(track.participant.identity))
//   );
//   console.log({ audioTracks, videoTracks });
//   return children({ audioTracks, videoTracks });
// }
