import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '@/utils/firebase/realtime';
import { useLocation } from 'react-router-dom';

export function useOnlineUserCount(roomId) {
  const [onlineCount, setOnlineCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const roomUsersRef = ref(rtdb, `rooms/${roomId}/users`);
    const unsubscribe = onValue(roomUsersRef, (snapshot) => {
      const users = snapshot.val();
      const onlineUsers = users
        ? Object.values(users).filter((user) => user.online).length
        : 0;
      setOnlineCount(onlineUsers);
    });
    return () => {
      unsubscribe();
    };
  }, [roomId, location.pathname]);

  return onlineCount;
}
