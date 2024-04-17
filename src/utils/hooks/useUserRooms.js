import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const useUserRooms = (userId) => {
  const [userRooms, setUserRooms] = useState([]);

  useEffect(() => {
    if (!userId) return undefined;

    const roomsCollectionRef = collection(db, 'users', userId, 'rooms');

    // 设置 Firestore 实时监听
    const unsubscribe = onSnapshot(
      roomsCollectionRef,
      (querySnapshot) => {
        const rooms = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserRooms(rooms);
      },
      (error) => {
        console.error('Error getting user rooms:', error);
      }
    );

    // 返回清理函数，当组件卸载时取消订阅
    return () => {
      unsubscribe();
    };
  }, [userId]); // 依赖数组包括 userId，当 userId 改变时重新订阅

  return userRooms;
};
