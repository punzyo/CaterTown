import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase/firestore';
import type { PullRequest, PullRequests } from '@/types';
interface UseConditionalPullRequestsParams {
  userId: string;
  roomId: string;
  gitHubId: string;
  permissionLevel: string;
}

export const useConditionalPullRequests = ({
  userId,
  roomId,
  gitHubId,
  permissionLevel,
}: UseConditionalPullRequestsParams) => {
  const [data, setData] = useState<PullRequests>({});

  useEffect(() => {
    if (!roomId || !userId || !gitHubId || !permissionLevel) return;
    let unsubscribe;

    if (permissionLevel !== 'member') {
      const prCollectionRef = collection(db, 'rooms', roomId, 'pullRequests');
      unsubscribe = onSnapshot(
        prCollectionRef,
        (querySnapshot) => {
          let pullRequests: Record<string, { prs: PullRequest[] }> = {};
          querySnapshot.docs.forEach((doc) => {
            const prData = doc.data();
            const openPRs = prData.prs
              ? prData.prs.filter((pr: PullRequest) => pr.state === 'open')
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
              ? prData.prs.filter((pr: PullRequest) => pr.state === 'open')
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
