import { app } from './firebase';
import {
  getFirestore,
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
import { creatRtRoom,deleteRoomFromRT, removeUserFromRTRoom } from './realtime';

export const db = getFirestore(app);

export async function updatePlayerPosition({ userId, userData, roomId, room }) {
  const roomDocRef = doc(db, 'rooms', roomId);
  console.log('my Room', room);
  try {
    const roomSnap = await getDoc(roomDocRef);
    let usersArray = roomSnap.data().users;
    const userIndex = usersArray.findIndex((user) => user.userId === userId);
    if (userIndex !== -1) {
      usersArray[userIndex].position = {
        top: userData.top,
        left: userData.left,
        direction: userData.direction,
        frame: userData.frame,
      };
      usersArray[userIndex].room = room;
    }
    await updateDoc(roomDocRef, {
      users: usersArray,
    });
  } catch (error) {
    console.error('Error updating position: ', error);
  }
}
export async function createRoom({
  userId,
  roomName,
  charName,
  character,
  map,
  startingPoint: position,
}) {
  console.log(userId, roomName, charName, character, position, map);
  try {
    const roomDocRef = await addDoc(collection(db, 'rooms'), {
      users: [
        {
          userId,
          charName,
          character,
          position,
          permissionLevel: 'admin',
          room: '',
          gitHubId: '',
        },
      ],
      name: roomName,
      createDate: Timestamp.now(),
      map,
    });
    console.log('Document written with ID: ', roomDocRef.id);
    creatRtRoom(roomDocRef.id);
    return roomDocRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
export async function JoinRoom({ roomId, user }) {
  const roomDocRef = doc(db, 'rooms', roomId);

  try {
    await updateDoc(roomDocRef, {
      users: arrayUnion({
        ...user,
        permissionLevel: 'student',
        room: '',
        gitHubId: '',
      }),
    });
    console.log('User added to room with ID:', roomId);
  } catch (error) {
    console.error('Error joining room:', error);
    throw error;
  }
}
export async function addRoomToUser({
  userId,
  roomName,
  roomId,
  character,
  charName,
  isCreater,
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
        isCreater,
      },
      { merge: true }
    );
    console.log(
      "Room with character info set in user's collection with Room ID:",
      roomId
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

export async function getUserDatabyId(userId) {
  const userDocRef = doc(db, 'users', userId);
  try {
    const docSnap = await getDoc(userDocRef);
    const data = docSnap.data();
    console.log(data);
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
    console.log('Message added successfully');
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

    const messageRef = doc(db, `rooms/${roomId}/users/${documentId}`);

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
    console.log('+++');
  } catch (error) {
    console.error('Failed to add unread message count:', error);
    throw new Error('Failed to update unread message count');
  }
}

export async function resetUnreadMessage({ roomId, privateChannelId, userId }) {
  if (!privateChannelId) return;
  console.log('rest', roomId, privateChannelId, userId);
  try {
    const unreadMsgRef = doc(db, `rooms/${roomId}/unReadMessages/${userId}`);

    const docSnapshot = await getDoc(unreadMsgRef);

    if (docSnapshot.exists()) {
      await updateDoc(unreadMsgRef, {
        [`messages.${privateChannelId}.count`]: 0,
      });
      console.log('Unread message count reset successfully');
    } else {
      console.log('No unread message record to reset');
    }
  } catch (error) {
    console.error('Failed to reset unread message count:', error);
    throw new Error('Failed to reset unread message count');
  }
}

export async function saveUserToFirestore({ authID, name, email }) {
  console.log(authID, name);
  try {
    const userRef = doc(db, 'users', authID);
    await setDoc(userRef, {
      name,
      email,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function getUserFromFirestore(authID) {
  console.log(authID);
  try {
    const userRef = doc(db, 'users', authID);
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      return { id: authID, ...userData };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data', error);
    return null;
  }
}
export async function editPlayerGitHub({ userId, gitHubId, roomId }) {
  const roomDocRef = doc(db, 'rooms', roomId);
  try {
    const roomSnap = await getDoc(roomDocRef);
    if (roomSnap.exists()) {
      let usersArray = roomSnap.data().users;
      const userIndex = usersArray.findIndex((user) => user.userId === userId);
      if (userIndex !== -1) {
        usersArray[userIndex].gitHubId = gitHubId;
        await updateDoc(roomDocRef, {
          users: usersArray,
        });
        console.log('GitHub ID updated successfully!');
        return true;
      }
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
    const result = await addDoc(broadcastsRef, {
      ...broadcastData,
      publishTime: Timestamp.fromDate(new Date(broadcastData.publishTime)),
      expirationTime: Timestamp.fromDate(
        new Date(broadcastData.expirationTime)
      ),
    });

    console.log(`Broadcast added with ID: ${result.id}`);
  } catch (error) {
    console.error('Error adding broadcast:', error);
  }
}

export async function deleteBroadcast({ roomId, docId }) {
  try {
    const broadcastRef = doc(db, 'rooms', roomId, 'broadcasts', docId);
    await deleteDoc(broadcastRef);
    console.log('Broadcast deleted successfully');
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
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      let users = roomSnap.data().users;
      const userIndex = users.findIndex((user) => user.userId === userId);

      if (userIndex !== -1) {
        let user = users[userIndex];
        user.permissionLevel = newPermissionLevel;
        users[userIndex] = user;
        await updateDoc(roomRef, {
          users: users,
        });

        console.log('Permission level updated successfully');
        return true;
      } else {
        console.log('User not found in room');
      }
    } else {
      console.log('No such room exists!');
    }
  } catch (error) {
    console.error('Error updating permission level:', error);
    return false;
  }
}

export async function deleteRoomFromAllUsers(roomId) {
  const roomRef = doc(db, 'rooms', roomId);
  console.log(roomId);
  try {
    await deleteRoomFromRT(roomId)
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      const users = roomSnap.data().users;

      for (const user of users) {
        const userRoomRef = doc(db, 'users', user.userId, 'rooms', roomId);
        await deleteDoc(userRoomRef);
      }
      
      await deleteDoc(roomRef);
      console.log('Room and all references deleted successfully');
    } else {
      console.log('Room does not exist');
    }
  } catch (error) {
    console.error('Error in deleting room: ', error);
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
  console.log('退掉',roomId, userId);
  const userRoomRef = doc(db, 'users', userId, 'rooms', roomId);

  const roomRef = doc(db, 'rooms', roomId);

  try {
    await removeUserFromRTRoom({ roomId, userId });
    await deleteDoc(userRoomRef);
    console.log('User room reference deleted.');

    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      await updateDoc(roomRef, {
        users: arrayRemove(userId),
      });
      console.log('User removed from room users array.');
    } else {
      console.log('Room does not exist.');
    }
  } catch (error) {
    console.error('Error removing user from room2: ', error);
  }
}
