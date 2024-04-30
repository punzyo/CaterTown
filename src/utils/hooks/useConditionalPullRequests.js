import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const useConditionalPullRequests = ({ userId, roomId, gitHubId, permissionLevel }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('PRPR', userId, roomId, gitHubId, permissionLevel);
    if (!roomId || !userId || !gitHubId || !permissionLevel) return;
    let unsubscribe;

    if (permissionLevel === 'admin' || permissionLevel === 'teacher') {
    
      const prCollectionRef = collection(db, 'rooms', roomId, 'pullRequests');
      unsubscribe = onSnapshot(
        prCollectionRef,
        (querySnapshot) => {
          let pullRequests = {};
          querySnapshot.docs.forEach((doc) => {
            pullRequests[doc.id] = doc.data();
          });
          setData(pullRequests);
        },
        (error) => {
          console.error('Error getting pull requests:', error);
        }
      );
    } else {
  
      const messageRef = doc(db, `rooms/${roomId}/pullRequests/${gitHubId}`);
      unsubscribe = onSnapshot(
        messageRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            setData({ [docSnapshot.id]: docSnapshot.data() });
          } else {
            setData({});
          }
        },
        (error) => {
          console.error("Error while fetching the message:", error);
        }
      );
    }

   
    return () => {
      unsubscribe();
    };
  }, [userId, roomId, gitHubId, permissionLevel]); 

  return data;
};
