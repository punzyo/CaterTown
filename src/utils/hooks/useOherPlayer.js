import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const usePlayer = ({roomId}) => {
  const [otherPlayers, setOtherPlayers] = useState([]);
  useEffect(() => {
    if (!roomId) return;
    const roomRef = doc(db, 'rooms', roomId);
    const unsubscribe = onSnapshot(roomRef, async (docSnapshot) => {
      const playerList = docSnapshot.data().users
      setOtherPlayers(playerList);
    });
    return () => {
      unsubscribe();
    };
  }, [roomId]);
  return otherPlayers;
};
