import LandingPage from './Components/Pages/LandingPage/index.jsx';
import HomePage from './Components/Pages/HomePage/index.jsx';
import GamePage from './Components/Pages/GamePage/index.jsx';
import InvitePage from './Components/Pages/InvitePage/index.jsx';
import SignUpPage from './Components/Pages/SignUpPage/index.jsx';
import SignInPage from './Components/Pages/SignInPage/index.jsx';
export const routesConfig = [
  {
    path: '/',
    element: <LandingPage />,
    requireAuth: false,
    redirectWhenAuth: '/home',
  },
  {
    path: '/home',
    element: <HomePage />,
    requireAuth: true,
  },
  {
    path: '/catertown/:roomId/:roomName',
    element: <GamePage />,
    requireAuth: true,
  },
  {
    path: '/invite/:roomId/:roomName',
    element: <InvitePage />,
    requireAuth: true,
  },
  {
    path: '/signUp',
    element: <SignUpPage />,
    requireAuth: false,
    redirectWhenAuth: '/home',
  },
  {
    path: '/signIn',
    element: <SignInPage />,
    requireAuth: false,
    redirectWhenAuth: '/home',
  },
];
