import { ref, set, remove, getDatabase } from 'firebase/database';

export const rtdb = getDatabase();

export const setRealTimeData = async (path, data) => {
  const reference = ref(rtdb, path);
  try {
    await set(reference, data);
  } catch (error) {
    console.error('Error setting real-time data:', error);
  }
};

export const deleteRealTimeData = async (path) => {
  const reference = ref(rtdb, path);
  try {
    await remove(reference);
  } catch (error) {
    console.error('Error deleting real-time data:', error);
  }
};

