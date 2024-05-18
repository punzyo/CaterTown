import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firestore';

export const usePrivateMessages = ({ userId, roomId, privateChannelId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!roomId || !userId || !privateChannelId) return;

    const sortedIds = [userId, privateChannelId].sort();
    const documentId = sortedIds.join('');

    const messageRef = doc(db, `rooms/${roomId}/privateMessages/${documentId}`);

    const unsubscribe = onSnapshot(
      messageRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setMessages(docSnapshot.data().messages || []);
        } else {
          setMessages([]);
        }
      },
      (err) => {
        console.error('Error while fetching the message:', err);
      }
    );

    return () => unsubscribe();
  }, [userId, roomId, privateChannelId]);

  return messages;
};
