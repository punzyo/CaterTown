import { useState, useEffect } from 'react';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const useBroadcasts = ({ roomId }) => {
  const [broadcasts, setBroadcasts] = useState([]);

  useEffect(() => {
    if (!roomId) return; 
    const roomRef = doc(db, 'rooms', roomId);
    const broadcastsRef = collection(roomRef, 'broadcasts');
    const unsubscribe = onSnapshot(broadcastsRef, (querySnapshot) => {
      const now = new Date();
      const filteredBroadcasts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const publishTime = new Date(data.publishTime.seconds * 1000); 
        const expirationTime = new Date(data.expirationTime.seconds * 1000) 
        if (publishTime <= now && (!expirationTime || expirationTime > now)) { 
          filteredBroadcasts.push({...data, id: doc.id}); 
        }
      });
      setBroadcasts(filteredBroadcasts); 
    });

    return () => unsubscribe();
  }, [roomId]);

  return broadcasts;
};
