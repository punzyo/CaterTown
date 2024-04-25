import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUserState } from '../../../utils/zustand';

const CheckAuth = () => {
  const { setUser } = useUserState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('ChouChouZooUser'));
    if (user) setUser(user);
  }, []);

  return <Outlet />;
};

export default CheckAuth;
