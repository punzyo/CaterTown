import { useTracks } from "@livekit/components-react"
import { Track } from 'livekit-client';
export default function TracksManager({isLocal, children}) {
    const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }], { onlySubscribed: false });
    const filteredTracks = tracks.filter(track => isLocal ? track.participant.isLocal : !track.participant.isLocal);

    return children(filteredTracks);
}
