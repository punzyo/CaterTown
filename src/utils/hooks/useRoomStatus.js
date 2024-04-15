import { useState, useEffect } from 'react';
import { ref, set, onValue, getDatabase, onDisconnect } from 'firebase/database';

export function useRoomStatus({userId, roomId}) {
  const [onlineStatus, setOnlineStatus] = useState(null)
  useEffect(() => {
    const db = getDatabase();

    // 设置用户的在线状态和房间ID
    const userStatusRef = ref(db, `rooms/${roomId}/users/${userId}`);
    set(userStatusRef, { online: true });

    // 设置断开连接时自动更新用户状态为离线
    onDisconnect(userStatusRef).set({ online: false });

    // 监听特定房间内所有用户的状态
    const roomUsersRef = ref(db, `rooms/${roomId}/users`);
    const unsubscribe = onValue(roomUsersRef, snapshot => {
      const users = snapshot.val() || {};
      setOnlineStatus(users);  // 处理或显示房间内所有用户的状态信息
    });

    return () => {
      unsubscribe();
    };
  }, [userId, roomId]);
  return onlineStatus
}