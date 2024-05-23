import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase/firestore';
import type { RoomType } from '@/types';

export const useUserRooms = (userId: string | undefined) => {
  const [userRooms, setUserRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return undefined;
    setLoading(true);
    const roomsCollectionRef = collection(db, 'users', userId, 'rooms');

    const unsubscribe = onSnapshot(
      roomsCollectionRef,
      (querySnapshot) => {
        const rooms: RoomType[] = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as RoomType)
        );

        rooms.sort((a, b) => b.joinDate.toMillis() - a.joinDate.toMillis());
        setUserRooms(rooms);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting user rooms:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { userRooms, loading };
};
