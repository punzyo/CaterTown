import { app } from './firebase';
import {
  getFirestore,
  doc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  collection,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';


export const db = getFirestore(app);

export async function updatePlayerPosition(playerName,data) {
  const roomDocRef = doc(db, 'rooms', '001');
  console.log('21',data);
  try {
    await updateDoc(roomDocRef, {
      [`users.${playerName}.position`]: {
        top: data.top, 
        left: data.left,
        direction:data.direction,
        frame:data.frame
      }
    });
    console.log("Position successfully updated!");
  } catch (error) {
    console.error("Error updating position: ", error);
  }
}

export async function getPlayerPosition(playerName) {
  const roomDocRef = doc(db, 'rooms', '001');

  try {

    const docSnap = await getDoc(roomDocRef);

    if (docSnap.exists()) {
   
      const playerPosition = docSnap.data().users[playerName]?.position;
      if (playerPosition) {
        console.log(`${playerName}'s position:`, playerPosition);
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
      const users = roomData.users || {};
      delete users[excludePlayerId];

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

