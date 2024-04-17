import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore'; 
import { db } from '../../firebase/firestore';

export const usePublicMessages = (roomId) => {
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      if (!roomId) return; 
  

      const messagesRef = doc(db, `rooms/${roomId}/publicMessages/messages`);
  

      const unsubscribe = onSnapshot(messagesRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setMessages(docSnapshot.data().messages || []); 
        } else {
          setMessages([]); 
        }
      }, err => {
        console.error("Error while fetching the messages:", err);
      });
  
 
      return () => unsubscribe();
    }, [roomId]);  
  
    return messages;
  };
