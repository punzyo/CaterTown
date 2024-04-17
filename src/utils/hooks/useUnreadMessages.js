import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore'; 
import { db } from '../../firebase/firestore';

export const useUnreadMessages = ({ userId, roomId }) => {
  const [messages, setMessages] = useState([]);

  
  useEffect(() => {
    if (!roomId || !userId) return;

    const messageRef = doc(db, `rooms/${roomId}/unreadMessages/${userId}`);

    const unsubscribe = onSnapshot(messageRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setMessages(docSnapshot.data().messages || []); 
      } else {
        setMessages([]); 
      }
    }, err => {
      console.error("Error while fetching the message:", err);
    });

    return () => unsubscribe();
  }, [userId, roomId]); 

  return messages;
};
