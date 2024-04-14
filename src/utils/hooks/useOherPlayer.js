import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const useOtherPlayer = ({playerId, roomId}) => {
  const [otherPlayers, setOtherPlayers] = useState([]);
  useEffect(() => {
    if (!playerId || !roomId) return;
    const roomRef = doc(db, 'rooms', roomId);
    const unsubscribe = onSnapshot(roomRef, async (docSnapshot) => {
      const playerList = docSnapshot.data().users;
      const otherPlayersArray =playerList.filter(user => user.name !== playerId)
  
      setOtherPlayers(otherPlayersArray);
    });
    return () => {
      unsubscribe();
    };
  }, [playerId,roomId]);
  return otherPlayers;
};
