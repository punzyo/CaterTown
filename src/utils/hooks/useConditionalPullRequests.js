import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export const useConditionalPullRequests = ({
  userId,
  roomId,
  gitHubId,
  permissionLevel,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!roomId || !userId || !gitHubId || !permissionLevel) return;
    let unsubscribe;

    if (permissionLevel !== 'member') {
      const prCollectionRef = collection(db, 'rooms', roomId, 'pullRequests');
      unsubscribe = onSnapshot(
        prCollectionRef,
        (querySnapshot) => {
          let pullRequests = {};
          querySnapshot.docs.forEach((doc) => {
            const prData = doc.data();
            const openPRs = prData.prs
              ? prData.prs.filter((pr) => pr.state === 'open')
              : [];
            if (openPRs.length > 0) {
              pullRequests[doc.id] = { ...prData, prs: openPRs };
            }
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
            const prData = docSnapshot.data();
            const openPRs = prData.prs
              ? prData.prs.filter((pr) => pr.state === 'open')
              : [];
            if (openPRs.length > 0) {
              setData({ [docSnapshot.id]: { ...prData, prs: openPRs } });
            } else {
              setData({});
            }
          } else {
            setData({});
          }
        },
        (error) => {
          console.error('Error while fetching the message:', error);
        }
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId, roomId, gitHubId, permissionLevel]);

  return data;
};
