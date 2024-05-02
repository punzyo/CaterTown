import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from './firebase';

export const auth = getAuth(app);

export async function registerUserToAuth({ email, password }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log('Registered with:', user.email);
    return user.uid;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error code:', errorCode, 'Error message:', errorMessage);
  }
}

export async function signInToAuth(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log('Logged in successfully:', user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error signing in:', errorCode, errorMessage);
  }
  return null;
}
