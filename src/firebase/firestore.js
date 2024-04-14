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
  arrayUnion 
} from 'firebase/firestore';


export const db = getFirestore(app);

export async function updatePlayerPosition(playerName, data) {
  const roomDocRef = doc(db, 'rooms', '001');

  try {
    const roomSnap = await getDoc(roomDocRef);

    if (roomSnap.exists()) {
      let usersArray = roomSnap.data().users || [];
      
      const userIndex = usersArray.findIndex(user => user.name === playerName);
      if (userIndex !== -1) {
        usersArray[userIndex].position = { 
          top: data.top, 
          left: data.left,
          direction: data.direction,
          frame: data.frame 
        };
      } else {
        usersArray.push({
          name: playerName,
          position: { 
            top: data.top, 
            left: data.left,
            direction: data.direction,
            frame: data.frame 
          }
        });
      }
      
      await updateDoc(roomDocRef, {
        users: usersArray
      });
    } else {
      await setDoc(roomDocRef, {
        users: [{
          name: playerName,
          position: { 
            top: data.top, 
            left: data.left,
            direction: data.direction,
            frame: data.frame 
          }
        }]
      });
      console.log("New room created and position set!");
    }
  } catch (error) {
    console.error("Error updating position: ", error);
  }
}

export async function getPlayerPosition(playerName) {
  const roomDocRef = doc(db, 'rooms', '001');

  try {

    const docSnap = await getDoc(roomDocRef);

    if (docSnap.exists()) {
   
      const playerIndex = docSnap.data().users.findIndex(user => user.name === playerName);
      const playerPosition = docSnap.data().users[playerIndex].position;
      if (playerPosition) {
        return playerPosition;
      } else {
        console.log(`${playerName} does not exist in this room.`);
        return null;
      }
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}


export async function getOtherPlayersData( excludePlayerId) {
  const roomDocRef = doc(db, 'rooms', '001');

  try {
    const docSnap = await getDoc(roomDocRef);

    if (docSnap.exists()) {
      const roomData = docSnap.data();
      const users = roomData.users.filter(user => user.name!== excludePlayerId);
      console.log("Other players data:", users);
      return users;
    } else {
      console.log("No such room exists!");
      return {};
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return {};
  }
}

export async function createRoom({userId, roomName, userName, character, map, startingPoint: position}) {
  console.log(userId, roomName, userName, character, position,map);
  try {
    const roomDocRef = await addDoc(collection(db, 'rooms'), {
      users: [{
        userId,
        userName,
        character
      }],
      name: roomName,
      createDate: Timestamp.now(), 
      map
    });
    console.log("Document written with ID: ", roomDocRef.id);
    return roomDocRef.id; 
  } catch (e) {
    console.error("Error adding document: ", e);
  }
} 

export async function addRoomToUser ({userId, roomId}){
  const userDocRef = doc(db, "users", userId);

  try {
    await updateDoc(userDocRef, {
      rooms: arrayUnion(roomId) 
    });
    console.log("User updated with new room ID:", roomId);
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
  
}