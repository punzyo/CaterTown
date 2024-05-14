import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useUserState } from '../../../utils/zustand';

const CheckAuth = () => {
  const { setUser, user } = useUserState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('我來驗證');
    const user = JSON.parse(localStorage.getItem('ChouChouZooUser'));
    console.log('現在user', user);
    if (user) {
      setUser(user);
      if (location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup') {
        navigate('/home');
      }
    } else {
      if (!['/signin', '/signup'].includes(location.pathname)) {
        navigate('/');
      }
    }
  }, [user.id,location.pathname]);

  return <Outlet />;
};

export default CheckAuth;
