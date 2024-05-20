import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase/firestore';
import { PlayerType } from '@/types';

export const usePlayer = (roomId:string) => {
  const [players, setPlayers] = useState<PlayerType[] | undefined>(undefined);

  useEffect(() => {
    if (!roomId) return;
    const positionsRef = collection(db, `rooms/${roomId}/users`);
    const q = query(positionsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const playersData: PlayerType[]= [];
      querySnapshot.forEach((doc) => {
        playersData.push({
          ...doc.data(),
        }as PlayerType);
      });
      setPlayers(playersData);
    });
    return () => unsubscribe();
  }, [roomId]);
  return players;
};
