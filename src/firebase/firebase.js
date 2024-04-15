import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG5bD54A2ilBLg3rMfLfVJDjMb9LYy5Xo",
  authDomain: "videotest-e2b3f.firebaseapp.com",
  databaseURL: "https://videotest-e2b3f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "videotest-e2b3f",
  storageBucket: "videotest-e2b3f.appspot.com",
  messagingSenderId: "829733820578",
  appId: "1:829733820578:web:39cdaca719efff0be55ffb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);