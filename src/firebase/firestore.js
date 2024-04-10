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


const db = getFirestore(app);
const docId = 'yili';
const data = {
  position: {
    top: 0,
    left: 0,
  },
};
export async function updatePlayerPosition(playerName,position) {
  const roomDocRef = doc(db, 'rooms', '001');

  try {
    await updateDoc(roomDocRef, {
      [`users.${playerName}.position`]: {
        top: position.top, 
        left: position.left
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
