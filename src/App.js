import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomeIndex from './view/Home/home';
import LoginIndex from './view/Login/login';
import RegisterIndex from './view/Register/register';
import MainPage from './view/Pages/mainpage';
import DragPage from './view/Pages/dragpage';
import DemoPage from './view/demo/demopage';

function AuthBridge() {
  const navigate = useNavigate();
  useEffect(() => {
    const onUnauthorized = () => navigate('/login');
    window.addEventListener('auth:unauthorized', onUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized);
  }, [navigate]);
  return null;
}

function App() {
  return (
    <Router>
      <AuthBridge />
      <div className="main-style">
        <Routes>
          <Route exact path="/" element={<HomeIndex />} />
          <Route path="/login" element={<LoginIndex />} />
          <Route path="/register" element={<RegisterIndex />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/dragpage" element={<DragPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
