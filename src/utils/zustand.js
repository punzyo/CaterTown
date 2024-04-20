import { create } from "zustand";
import { Track } from "livekit-client";
export const useUserState =  create((set, get) => ({
    user: {
        name: '班尼',
        email: '',
        id: 'benny',
      },
      setUser: (userData) =>
        set((state) => ({
          ...state,
          user: { ...state.user, ...userData },
        })),
      resetUser: () =>
        set({
          user: {
            name: '',
            email: '',
            id: '',
          },
        }),
      getUserData: () => get().user,
}));
export const usePlayerTracks = create((set, get) => ({
  localTracks: [],
  remoteTracks: [],
  nearbyPlayers: [],

  setTracks: (allTracks) => {
    const { nearbyPlayers } = get();
    const local = [];
    const remote = [];

    allTracks.forEach(track => {
      const participantIdentity = track.participant.identity;
      const isLocalParticipant = track.participant.isLocal;
      const isNearbyParticipant = nearbyPlayers.includes(participantIdentity);

      if (isLocalParticipant) {
        if (track.source === Track.Source.ScreenShare && track.publication) {
          // Prefer screenshare track if it's active
          local.push(track);
        } else if (track.source === Track.Source.Camera && !local.some(t => t.participant.identity === participantIdentity)) {
          // Store the camera track if no screenshare track has been stored yet
          local.push(track);
        }
      } else if (!isLocalParticipant && isNearbyParticipant) {
        if (track.source === Track.Source.ScreenShare && track.publication) {
          // Prefer screenshare track for remote if it's active
          remote.push(track);
        } else if (track.source === Track.Source.Camera && !remote.some(t => t.participant.identity === participantIdentity)) {
          // Store the camera track for remote if no screenshare track has been stored yet
          remote.push(track);
        }
      }
    });

    set({ localTracks: local, remoteTracks: remote });
  },

  setNearbyPlayers: (players) => set({ nearbyPlayers: players }),
}));