import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const useOtherPlayer = (playerId) => {
  const [otherPlayers, setOtherPlayers] = useState([]);
  useEffect(() => {
    if (!playerId) return;
    const roomRef = doc(db, 'rooms', '001');
    const unsubscribe = onSnapshot(roomRef, async (docSnapshot) => {
      const playerList = docSnapshot.data().users;
      const otherPlayersArray = Object.entries(playerList)
        .filter(([name]) => name !== playerId)
        .map(([name, data]) => ({
          name,
          ...data,
        }));

      setOtherPlayers(otherPlayersArray);
    });
    return () => {
      unsubscribe();
    };
  }, [playerId]);
  return otherPlayers;
};
