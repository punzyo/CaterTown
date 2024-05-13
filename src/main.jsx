import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import LandingPage from './Components/Pages/LandingPage/index.jsx';
import HomePage from './Components/Pages/HomePage';
import GamePage from './Components/Pages/GamePage';
import InvitePage from './Components/Pages/InvitePage';
import SignUpPage from './Components/Pages/SignUpPage/index.jsx';
import SignInPage from './Components/Pages/SiginInPage/index.jsx';
import CheckAuth from './Components/Pages/CheckAuth/index.jsx';
import MapEditor from './Components/Pages/MapEditor/index.jsx';
import MapGenerator from './Components/Pages/MapEditor/MapGenerator/index.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MapImages from './Components/Pages/MapEditor/MapImages/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<CheckAuth />}>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="catertown/:roomId/:roomName" element={<GamePage />} />
          <Route path="invite/:roomId/:roomName" element={<InvitePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="map" element={<MapEditor />} />
          <Route path="mapImages" element={<MapImages />} />
          <Route path="mapgen" element={<MapGenerator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
