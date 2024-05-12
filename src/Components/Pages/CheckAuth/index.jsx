import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useUserState } from '../../../utils/zustand';

const CheckAuth = () => {
  const { setUser, setLoginChecked, user } = useUserState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('我來驗證');
    const user = JSON.parse(localStorage.getItem('ChouChouZooUser'));

    if (user) {
      setUser(user);
      setLoginChecked(true);
      if (location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup') {
        navigate('/home');
      }
    } else {
      setLoginChecked(true);
      if (!['/signin', '/signup'].includes(location.pathname)) {
        navigate('/');
      }
    }
  }, [user.id]);

  return <Outlet />;
};

export default CheckAuth;
