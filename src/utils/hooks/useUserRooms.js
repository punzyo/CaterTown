import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const useUserRooms = (userId) => {
  const [userRooms, setUserRooms] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return undefined;
    setLoading(true);
    const roomsCollectionRef = collection(db, 'users', userId, 'rooms');

    const unsubscribe = onSnapshot(
      roomsCollectionRef,
      (querySnapshot) => {
        const rooms = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        rooms.sort((a, b) => b.joinDate - a.joinDate);
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

  return {userRooms,loading};
};
