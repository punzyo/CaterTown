import { usePlayerTracks } from '../zustand';
import { Track } from 'livekit-client';

const filterTracks = (allTracks, filterCondition) => {
  const objTracks = allTracks?.reduce((acc, track) => {
    const participantIdentity = track.participant.identity;
    if (filterCondition(track)) {
      if (track.source === Track.Source.ScreenShare && track.publication) {
        acc[participantIdentity] = track;
      } else if (
        track.source === Track.Source.Camera &&
        !acc[participantIdentity]
      ) {
        acc[participantIdentity] = track;
      }
    }
    return acc;
  }, {});
  return Object.values(objTracks);
};

export const useLocalTracks = () => {
  const { allTracks } = usePlayerTracks();
  return filterTracks(allTracks, (track) => track.participant.isLocal);
};

export const useRemoteTracks = (nearbyPlayers) => {
  const { allTracks } = usePlayerTracks();
  return filterTracks(
    allTracks,
    (track) =>
      !track.participant.isLocal &&
      nearbyPlayers.some(
        (player) => player.charName === track.participant.identity
      )
  );
};

export const useAudioTracks = (isLocal, nearbyPlayers) => {
  const { allTracks } = usePlayerTracks();
  return allTracks
    .filter((track) => track.source === Track.Source.Microphone)
    .filter((track) =>
      isLocal
        ? track.participant.isLocal
        : !track.participant.isLocal &&
          nearbyPlayers.some(
            (player) => player.charName === track.participant.identity
          )
    );
};
