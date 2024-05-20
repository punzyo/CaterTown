import { useState, useEffect } from 'react';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import type { BroadcastData } from '@/types';
export const useBroadcasts = ({ roomId }: { roomId: string |undefined }) => {
  const [broadcasts, setBroadcasts] = useState<BroadcastData[]>([]);

  useEffect(() => {
    if (!roomId) return;
    const roomRef = doc(db, 'rooms', roomId);
    const broadcastsRef = collection(roomRef, 'broadcasts');
    const unsubscribe = onSnapshot(broadcastsRef, (querySnapshot) => {
      const now = new Date();
      const filteredBroadcasts: BroadcastData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as BroadcastData;
        const publishTime = new Date(data.publishTime.seconds * 1000);
        const expirationTime = new Date(data.expirationTime.seconds * 1000);
        if (publishTime <= now && (!expirationTime || expirationTime > now)) {
          filteredBroadcasts.push({ ...data, id: doc.id });
        }
      });
      setBroadcasts(filteredBroadcasts);
    });

    return () => unsubscribe();
  }, [roomId]);

  return broadcasts;
};
