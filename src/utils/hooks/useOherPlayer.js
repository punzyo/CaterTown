import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase/firestore';

export const usePlayer = (roomId) => {
  const [players, setPlayers] = useState();

  useEffect(() => {
    if (!roomId) return;
    const positionsRef = collection(db, `rooms/${roomId}/users`);
    const q = query(positionsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const playersData = [];
      querySnapshot.forEach((doc) => {
        playersData.push({
          ...doc.data(),
        });
      });
      setPlayers(playersData);
    });
    return () => unsubscribe();
  }, [roomId]);
  return players;
};
