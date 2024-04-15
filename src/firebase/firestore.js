import { app } from './firebase';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  collection,
  onSnapshot,
  Timestamp,
  arrayUnion,
} from 'firebase/firestore';
import { creatRtRoom } from './realtime';


export const db = getFirestore(app);

export async function updatePlayerPosition({ userId, userData, roomId }) {
  const roomDocRef = doc(db, 'rooms', roomId);
  console.log(userData);
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
    }
    await updateDoc(roomDocRef, {
      users: usersArray,
    });
  } catch (error) {
    console.error('Error updating position: ', error);
  }
}

export async function getPlayerData({ userId, roomId }) {
  console.log('當前使用者', userId), '房間為', roomId;
  const roomDocRef = doc(db, 'rooms', roomId);

  try {
    const docSnap = await getDoc(roomDocRef);

    if (docSnap.exists()) {
      const playerIndex = docSnap
        .data()
        .users.findIndex((user) => user.userId === userId);
      const playerData = docSnap.data().users[playerIndex];
      if (playerData) {
        return playerData;
      } else {
        console.log(`${userId} does not exist in this room.`);
        return null;
      }
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
}

export async function getOtherPlayersData(excludePlayerId) {
  const roomDocRef = doc(db, 'rooms', '001');

  try {
    const docSnap = await getDoc(roomDocRef);

    if (docSnap.exists()) {
      const roomData = docSnap.data();
      const users = roomData.users.filter(
        (user) => user.userId !== excludePlayerId
      );
      console.log('Other players data:', users);
      return users;
    } else {
      console.log('No such room exists!');
      return {};
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return {};
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
          online:false,
        },
      ],
      name: roomName,
      createDate: Timestamp.now(),
      map,
    });
    console.log('Document written with ID: ', roomDocRef.id);
    creatRtRoom(roomDocRef.id)
    return roomDocRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
export async function joinRoom({roomId, user}) {
  const roomDocRef = doc(db, 'rooms', roomId);

  try {
    await updateDoc(roomDocRef, {
      users: arrayUnion({...user, online:false})
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
}) {
  const roomDocRef = doc(db, 'users', userId, 'rooms', roomId);

  try {
    await setDoc(
      roomDocRef,
      { roomName, character, charName, joinDate: Timestamp.now() },
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

export async function getRoomData(roomId) {
  
}
