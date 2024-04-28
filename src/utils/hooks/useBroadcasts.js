import { useState, useEffect } from 'react';
import { doc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const useBroadcasts = ({ roomId }) => {
  const [broadcasts, setBroadcasts] = useState([]);

  useEffect(() => {
    if (!roomId) return; // 如果没有 roomId，则不执行任何操作

    // 获取 room 文档的引用
    const roomRef = doc(db, 'rooms', roomId);
    // 获取 broadcasts 集合的引用
    const broadcastsRef = collection(roomRef, 'broadcasts');

    // 订阅文档变更
    const unsubscribe = onSnapshot(broadcastsRef, (querySnapshot) => {
      const now = new Date(); // 获取当前时间
      const filteredBroadcasts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const publishTime = new Date(data.publishTime.seconds * 1000); // 转换时间戳到 Date 对象
        if (publishTime <= now) { // 只保留 publishTime 在当前时间之前的文档
          filteredBroadcasts.push(data);
        }
      });
      setBroadcasts(filteredBroadcasts); // 更新状态
    });

    return () => unsubscribe(); // 清理订阅
  }, [roomId]);

  return broadcasts;
};
