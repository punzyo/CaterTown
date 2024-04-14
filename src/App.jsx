import BaseGlobalStyle from '@/BaseGlobalStyle';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
          <BaseGlobalStyle />
          <Outlet />
    </>
  );
}
