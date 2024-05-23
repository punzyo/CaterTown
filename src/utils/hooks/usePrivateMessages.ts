import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { Timestamp } from 'firebase/firestore';

interface MessageType {
  charName: string;
  message: string;
  postTime?: Timestamp;
}
interface UsePrivateMessagesParams {
  userId: string;
  roomId: string;
  privateChannelId: string;
}
export const usePrivateMessages = ({
  userId,
  roomId,
  privateChannelId,
}: UsePrivateMessagesParams) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (!roomId || !userId || !privateChannelId) return;

    const sortedIds = [userId, privateChannelId].sort();
    const documentId = sortedIds.join('');

    const messageRef = doc(db, `rooms/${roomId}/privateMessages/${documentId}`);

    const unsubscribe = onSnapshot(
      messageRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const messagesData: MessageType[] = data.messages || [];
          setMessages(messagesData);
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
