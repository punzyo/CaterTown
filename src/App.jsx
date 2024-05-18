import BaseGlobalStyle from '@/BaseGlobalStyle';
import { useUserState } from './utils/zustand';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routesConfig } from './routesConfig';
export default function App() {
  const { user } = useUserState();

  return (
    <>
      <BaseGlobalStyle />
      <Routes>
        {routesConfig.map(
          ({ path, element, requireAuth, redirectWhenAuth }) => {
            if (user && redirectWhenAuth) {
              return (
                <Route
                  key={path}
                  path={path}
                  element={<Navigate to={redirectWhenAuth} replace />}
                />
              );
            }
            if (requireAuth && !user) {
              return (
                <Route
                  key={path}
                  path={path}
                  element={<Navigate to="/" replace />}
                />
              );
            }
            return <Route key={path} path={path} element={element} />;
          }
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
