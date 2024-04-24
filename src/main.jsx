import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomePage from './Components/Pages/HomePage'
import GamePage from './Components/Pages/GamePage'
import InvitePage from './Components/Pages/InvitePage'
import SignUpPage from './Components/Pages/SignUpPage/index.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="chouchouzoo/:roomId/:roomName" element={<GamePage />} />
        <Route path="invite/:roomId/:roomName" element={<InvitePage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>

  ,
)
