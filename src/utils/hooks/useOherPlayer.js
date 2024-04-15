import { useState, useEffect } from 'react';
import { doc, onSnapshot, getDoc , updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const usePlayer = ({ userId, roomId }) => {
  const [otherPlayers, setOtherPlayers] = useState([]);
    useEffect(() => {
      const roomRef = doc(db, 'rooms', roomId);
  
      const updateOnlineStatus = async (online) => {
        try {
          const docSnapshot = await getDoc(roomRef);
          if (docSnapshot.exists()) {
            const users = docSnapshot.data().users;
            const updatedUsers = users.map(user =>
              user.userId === userId ? { ...user, online: online } : user
            );
            await updateDoc(roomRef, { users: updatedUsers });
          }
        } catch (error) {
          console.error("Failed to update online status:", error);
        }
      };
      updateOnlineStatus(true);
  
      return () => {
        updateOnlineStatus(false);
      };
    }, []);

  useEffect(() => {
    if (!roomId) return;
    const roomRef = doc(db, 'rooms', roomId);
    const unsubscribe = onSnapshot(roomRef, async (docSnapshot) => {
      const playerList = docSnapshot.data().users;
      setOtherPlayers(playerList);
    });
    return () => {
      unsubscribe();
    };
  }, [roomId]);
  return otherPlayers;
};
