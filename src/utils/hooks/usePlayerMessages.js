import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const usePlayerMessages = ({ userId, roomId }) => {
  const [messages, setMessages] = useState([]);
  
  
};
