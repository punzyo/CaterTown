import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  AuthError,
} from 'firebase/auth';
import { app } from './firebase';

export const auth = getAuth(app);

export async function registerUserToAuth(
  email: string,
  password: string
): Promise<string | false> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user.uid;
  } catch (error) {
    handleAuthError(error as AuthError);

    return false;
  }
}

export async function signInToAuth(
  email: string,
  password: string
): Promise<User| null> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    handleAuthError(error as AuthError);
  }
  return null;
}

const handleAuthError = (error: AuthError) => {
  let errorMessage = '';
  switch (error.code) {
    case 'auth/email-already-in-use':
      errorMessage = '該電子郵件地址已被使用';
      break;
    case 'auth/user-not-found':
      errorMessage = '用戶不存在';
      break;
    case 'auth/wrong-password':
      errorMessage = '密碼錯誤';
      break;
    case 'auth/invalid-login-credentials':
      errorMessage = '登入憑據無效';
      break;
    case 'auth/popup-closed-by-user':
      errorMessage = '登入視窗已被用戶關閉';
      break;
    case 'auth/invalid-credential':
      errorMessage = '帳號或密碼錯誤';
      break;
    case 'auth/cancelled-popup-request':
      errorMessage = '登入窗口已被關閉';
      break;
    case 'auth/popup-blocked':
      errorMessage = '彈出窗口被阻擋';
      break;
    default:
      errorMessage = '發生錯誤: ' + error.code;
  }
  alert(errorMessage);
};
