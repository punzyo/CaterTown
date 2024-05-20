import { usePlayerTracks } from '../zustand';
import { Track } from 'livekit-client';
import type { NearbyPlayer } from '@/types';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-react';
const filterTracks = (
  allTracks: TrackReferenceOrPlaceholder[],
  filterCondition: (track: TrackReferenceOrPlaceholder) => boolean
): TrackReferenceOrPlaceholder[] => {
  const objTracks = allTracks?.reduce<
    Record<string, TrackReferenceOrPlaceholder>
  >((acc, track) => {
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
  return filterTracks(
    allTracks,
    (track: TrackReferenceOrPlaceholder) => track.participant.isLocal
  );
};

export const useRemoteTracks = (nearbyPlayers: NearbyPlayer[]) => {
  const { allTracks } = usePlayerTracks();
  return filterTracks(
    allTracks,
    (track: TrackReferenceOrPlaceholder) =>
      !track.participant.isLocal &&
      nearbyPlayers.some(
        (player) => player.charName === track.participant.identity
      )
  );
};

export const useAudioTracks = (
  isLocal: boolean,
  nearbyPlayers: NearbyPlayer[]
) => {
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
