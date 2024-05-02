import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUserState } from '../../../utils/zustand';
import { auth } from '../../../firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

const CheckAuth = () => {
  const { setUser,setLoginChecked } = useUserState();
  useEffect(() => {
    console.log('我來驗證');
    const user = JSON.parse(localStorage.getItem('ChouChouZooUser'));
    if (user) setUser(user);
    setLoginChecked(true)
  }, []);
  // useEffect(() => {
    
  //   const unsubscribe = onAuthStateChanged(auth,currentUser => {
  //     console.log(currentUser);
  //     setUser(currentUser);
  //     if (currentUser) {
  //       console.log('User is signed in:', currentUser);
  //     } else {
  //       console.log('No user is signed in.');
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);
  return <Outlet />;
};

export default CheckAuth;
