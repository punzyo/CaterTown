import { ref, set, remove, getDatabase, onDisconnect } from 'firebase/database';

export const rtdb = getDatabase();

export const createRtRoom = async (roomId) => {
  const roomRef = ref(rtdb, `rooms/${roomId}`);
  try {
    await set(roomRef, {
      created: new Date().toISOString(),
      users: {},
    });
  } catch (error) {
    console.error(error);
  }
};

export const joinRtRoom = async (roomId, userId) => {
  const userRoomRef = ref(rtdb, `rooms/${roomId}/users/${userId}`);

  set(userRoomRef, { online: true });
  onDisconnect(userRoomRef).set({ online: false });
};

export async function deleteRoomFromRT(roomId) {
  const roomRef = ref(rtdb, `rooms/${roomId}`);
  try {
    await remove(roomRef);
  } catch (error) {
    console.error('Error removing user from room:', error);
  }
}

export async function removeUserFromRTRoom({ roomId, userId }) {
  const userRef = ref(rtdb, `rooms/${roomId}/users/${userId}`);

  try {
    await remove(userRef);
  } catch (error) {
    console.error('Error removing user from room:', error);
  }
}
