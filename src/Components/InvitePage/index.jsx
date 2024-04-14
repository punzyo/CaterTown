import { useParams } from 'react-router-dom';
export default function InvitePage() {
    const { roomId, roomName } = useParams();
  return (
    <div>
         <h1>Invite Page</h1>
      <p>Room ID: {roomId}</p>
      <p>Room Name: {roomName}</p>
    </div>
  )
}
