import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);


export async function registerUsertoAuth({email, password}) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Registered with:', user.email);
      return user.uid;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error code:', errorCode, 'Error message:', errorMessage);
    }
  }