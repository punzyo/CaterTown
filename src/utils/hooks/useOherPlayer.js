import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const usePlayer = ({ roomId }) => {
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    if (!roomId) return;
    const roomRef = doc(db, 'rooms', roomId);
    const unsubscribe = onSnapshot(roomRef, async (docSnapshot) => {
      const roomData = docSnapshot.data();
      setPlayers(roomData);
    });
    return () => {
      unsubscribe();
    };
  }, [roomId]);
  return players;
};
