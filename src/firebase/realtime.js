import { ref, set, getDatabase, onDisconnect } from 'firebase/database';

export const rtdb = getDatabase();

export const creatRtRoom = async (roomId) => {
  const roomRef = ref(rtdb, `rooms/${roomId}`);
  try {
    await set(roomRef, {
      created: new Date().toISOString(),
      users: {},
    });
    console.log('創立RT');
  } catch (error) {
    console.error(error);
  }
};

export const joinRtRoom = async (roomId, userId) => {
  const userRoomRef = ref(rtdb, `rooms/${roomId}/users/${userId}`);

  set(userRoomRef, { online: true });
  onDisconnect(userRoomRef).set({ online: false });
};
