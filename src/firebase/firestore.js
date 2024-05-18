import { app } from './firebase';
import {
  getFirestore,
  query,
  where,
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  collection,
  Timestamp,
  arrayUnion,
  increment,
  deleteDoc,
  arrayRemove,
} from 'firebase/firestore';
import {
  createRtRoom,
  deleteRoomFromRT,
  removeUserFromRTRoom,
} from './realtime';

export const db = getFirestore(app);

export async function updatePlayerPosition({ userId, userData, roomId, room }) {
  const userPositionRef = doc(db, `rooms/${roomId}/users`, userId);

  try {
    await updateDoc(userPositionRef, {
      position: {
        top: userData.top,
        left: userData.left,
        direction: userData.direction,
        frame: userData.frame,
      },
      room,
    });
  } catch (error) {
    console.error('Error updating position: ', error);
  }
}
export async function createRoom({ roomName, map }) {
  try {
    const roomDocRef = await addDoc(collection(db, 'rooms'), {
      name: roomName,
      createDate: Timestamp.now(),
      map,
    });
    createRtRoom(roomDocRef.id);
    return roomDocRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
export async function initPlayerData({
  userId,
  roomId,
  position,
  charName,
  character,
  permissionLevel,
}) {
  const userDocRef = doc(collection(db, `rooms/${roomId}/users`), userId);

  try {
    await setDoc(userDocRef, {
      position,
      room: '',
      permissionLevel,
      gitHubId: '',
      charName,
      character,
      userId,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function addRoomToUser({
  userId,
  roomName,
  roomId,
  character,
  charName,
  isCreator,
}) {
  const roomDocRef = doc(db, 'users', userId, 'rooms', roomId);

  try {
    await setDoc(
      roomDocRef,
      {
        roomName,
        character,
        charName,
        joinDate: Timestamp.now(),
        isCreator,
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error(
      "Error setting room with character info in user's collection:",
      error
    );
    return false;
  }
}

export async function getUserDataById(userId) {
  const userDocRef = doc(db, 'users', userId);
  try {
    const docSnap = await getDoc(userDocRef);
    const data = docSnap.data();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserRoomsbyId(userId) {
  const roomsCollectionRef = collection(db, 'users', userId, 'rooms');

  try {
    const querySnapshot = await getDocs(roomsCollectionRef);
    const rooms = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return rooms;
  } catch (error) {
    console.error('Error getting user rooms:', error);
    throw new Error('Failed to fetch user rooms.');
  }
}

export async function sendPublicMessage({ roomId, charName, message }) {
  const messagesRef = doc(db, `rooms/${roomId}/publicMessages/messages`);

  try {
    const messagesSnap = await getDoc(messagesRef);

    const newMessage = { charName, message, postTime: Timestamp.now() };

    if (messagesSnap.exists()) {
      await updateDoc(messagesRef, {
        messages: arrayUnion(newMessage),
      });
    } else {
      await setDoc(messagesRef, {
        messages: [newMessage],
      });
    }
  } catch (error) {
    console.error('Error adding message: ', error);
  }
}

export async function sendPrivateMessage({
  userId,
  roomId,
  charName,
  privateChannelId,
  message,
}) {
  try {
    const sortedIds = [userId, privateChannelId].sort();
    const documentId = sortedIds.join('');

    const messageRef = doc(db, `rooms/${roomId}/privateMessages/${documentId}`);

    const docSnapshot = await getDoc(messageRef);
    const newMessage = {
      charName,
      message,
    };

    if (docSnapshot.exists()) {
      let currentMessages = docSnapshot.data().messages || [];
      currentMessages.push(newMessage);
      await updateDoc(messageRef, { messages: currentMessages });
    } else {
      await setDoc(messageRef, { messages: [newMessage] });
    }
  } catch (error) {
    console.error('Failed to send message:', error);
    throw new Error('Failed to send message');
  }
}

export async function addUnreadMessage({ roomId, privateChannelId, userId }) {
  try {
    const unreadMsgRef = doc(
      db,
      `rooms/${roomId}/unReadMessages/${privateChannelId}`
    );

    const docSnapshot = await getDoc(unreadMsgRef);

    if (docSnapshot.exists()) {
      await updateDoc(unreadMsgRef, {
        [`messages.${userId}.count`]: increment(1),
      });
    } else {
      await setDoc(unreadMsgRef, {
        messages: {
          [userId]: { count: 1 },
        },
      });
    }
  } catch (error) {
    console.error('Failed to add unread message count:', error);
    throw new Error('Failed to update unread message count');
  }
}

export async function resetUnreadMessage({ roomId, privateChannelId, userId }) {
  if (!privateChannelId) return;
  try {
    const unreadMsgRef = doc(db, `rooms/${roomId}/unReadMessages/${userId}`);

    const docSnapshot = await getDoc(unreadMsgRef);

    if (docSnapshot.exists()) {
      await updateDoc(unreadMsgRef, {
        [`messages.${privateChannelId}.count`]: 0,
      });
    }
  } catch (error) {
    console.error('Failed to reset unread message count:', error);
    throw new Error('Failed to reset unread message count');
  }
}

export async function saveUserToFirestore({ authID, name, email }) {
  try {
    const userRef = doc(db, 'users', authID);
    await setDoc(userRef, {
      name,
      email,
      hasViewedHomePageTutorial1: false,
      hasViewedHomePageTutorial2: false,
      hasViewedGamePageTutorial: false,
    });
    return true;
  } catch (error) {
    alert('發生錯誤: ' + error.message);
    return false;
  }
}

export async function getUserFromFirestore(authID) {
  try {
    const userRef = doc(db, 'users', authID);
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      return { id: authID, ...userData };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user data', error);
    return null;
  }
}
export async function editPlayerGitHub({ userId, gitHubId, roomId }) {
  const userDocRef = doc(db, 'rooms', roomId, 'users', userId);

  try {
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      await updateDoc(userDocRef, {
        gitHubId: gitHubId,
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating GitHub ID: ', error);
    return false;
  }
}

export async function sendBroadcast({ roomId, broadcastData }) {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const broadcastsRef = collection(roomRef, 'broadcasts');
    addDoc(broadcastsRef, {
      ...broadcastData,
      expirationTime: Timestamp.fromDate(
        new Date(broadcastData.expirationTime)
      ),
    });
  } catch (error) {
    console.error('Error adding broadcast:', error);
  }
}

export async function deleteBroadcast({ roomId, docId }) {
  try {
    const broadcastRef = doc(db, 'rooms', roomId, 'broadcasts', docId);
    await deleteDoc(broadcastRef);
  } catch (error) {
    console.error('Error deleting broadcast:', error);
  }
}
export async function editPermissionLevel({
  roomId,
  userId,
  newPermissionLevel,
}) {
  try {
    const userDocRef = doc(db, `rooms/${roomId}/users`, userId);

    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      await updateDoc(userDocRef, {
        permissionLevel: newPermissionLevel,
      });

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error updating permission level:', error);
    return false;
  }
}

export async function deleteRoomFromAllUsers(roomId) {
  const roomRef = doc(db, 'rooms', roomId);

  try {
    const usersInRoomRef = collection(db, `rooms/${roomId}/users`);
    const usersSnapshot = await getDocs(usersInRoomRef);
    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const userRoomRef = doc(db, 'users', userId, 'rooms', roomId);
      await deleteDoc(userRoomRef);
    }

    const subcollections = [
      'publicMessages',
      'pullRequests',
      'unReadMessages',
      'users',
    ];
    for (const subcollection of subcollections) {
      const subRef = collection(db, `rooms/${roomId}/${subcollection}`);
      const subSnapshot = await getDocs(subRef);
      for (const subDoc of subSnapshot.docs) {
        await deleteDoc(doc(db, `rooms/${roomId}/${subcollection}`, subDoc.id));
      }
    }
    await deleteDoc(roomRef);
    await deleteRoomFromRT(roomId);
  } catch (error) {
    console.error('Error in deleting room and associated data:', error);
  }
}
export async function checkUserRoom({ roomId, userId }) {
  const userRoomRef = doc(db, 'users', userId, 'rooms', roomId);
  try {
    const userRoomSnap = await getDoc(userRoomRef);

    if (userRoomSnap.exists()) return true;
    return false;
  } catch (error) {
    console.error('Error : ', error);
  }
}

export async function removeUserFromRoom({ roomId, userId }) {
  const userRoomRef = doc(db, 'users', userId, 'rooms', roomId);

  const roomRef = doc(db, 'rooms', roomId);

  try {
    await removeUserFromRTRoom({ roomId, userId });
    await deleteDoc(userRoomRef);

    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      await updateDoc(roomRef, {
        users: arrayRemove(userId),
      });
    }
  } catch (error) {
    console.error('Error removing user from room2: ', error);
  }
}

export async function isNameAvailable({ roomId, charName }) {
  try {
    const usersRef = collection(db, 'rooms', roomId, 'users');
    const charQuery = query(usersRef, where('charName', '==', charName));
    const querySnapshot = await getDocs(charQuery);

    if (querySnapshot.empty) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking character name: ', error);
    throw new Error('Error while checking for character name.');
  }
}

export async function updateTutorialState(userId, tutorialName) {
  const userRef = doc(db, 'users', userId);

  try {
    await updateDoc(userRef, {
      [tutorialName]: true,
    });
  } catch (error) {
    console.error('Error updating tutorial:', error);
  }
}
