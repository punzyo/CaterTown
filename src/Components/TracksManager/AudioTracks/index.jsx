import { useTracks } from "@livekit/components-react";
import { Track } from 'livekit-client';
import { AudioTrack } from "@livekit/components-react";

export default function AudioManager({ isLocal, nearbyPlayers, audioVolume }) {
  // 使用 useTracks 獲取音訊軌道
  const audioTracks = useTracks(
    [{ source: Track.Source.Microphone, withPlaceholder: true }],
    { onlySubscribed: false }
  ).filter(track =>
    isLocal
      ? track.participant.isLocal
      : !track.participant.isLocal && nearbyPlayers.includes(track.participant.identity)
  );

  return (
    <div>
      {audioTracks.map((track) =>{ 
        console.log(track.participant.identity,audioVolume);
        return(
        <AudioTrack key={track.sid} trackRef={track} volume={audioVolume[track.participant.identity]}/>
      )})}
    </div>
  );
}