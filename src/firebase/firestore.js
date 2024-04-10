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
async function updatePlayerPosition(docId, position) {
    try {
        const docRef = doc(db, "users", docId);
        await updateDoc(docRef, position);
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
  }
  