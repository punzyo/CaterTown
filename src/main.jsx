import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomePage from './Components/HomePage/index.jsx'
import GamePage from './Components/GamePage/index.jsx'
import InvitePage from './Components/InvitePage/index.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="chouchouzoo/:roomId" element={<GamePage />} />
        <Route path="invite/:roomId/:roomName" element={<InvitePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>

  </React.StrictMode>,
)
