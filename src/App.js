import React, { useEffect } from 'react';
import './App.css';
import './style/theme.less';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { TabsProvider, useTabs } from './contexts/TabsContext';
import { useTheme } from './hooks/useTheme';
import TabBar from './view/components/TabBar';
import HomeIndex from './view/Home/home';
import LoginIndex from './view/Login/login';
import RegisterIndex from './view/Register/register';
import MainPage from './view/Pages/mainpage';
import DragPage from './view/Pages/dragpage';
import DemoPage from './view/demo/demopage';
import SettingsPage from './view/Pages/settings';
import CommandPalette from './view/components/CommandPalette';

function AuthBridge() {
  const navigate = useNavigate();
  useEffect(() => {
    const onUnauthorized = () => navigate('/login');
    window.addEventListener('auth:unauthorized', onUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized);
  }, [navigate]);
  return null;
}

function TabsSyncer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { openTab, activeKey } = useTabs();

  useEffect(() => {
    openTab(location.pathname);
  }, [location.pathname, openTab]);

  useEffect(() => {
    if (activeKey && location.pathname !== activeKey) {
      navigate(activeKey);
    }
  }, [activeKey, location.pathname, navigate]);

  return null;
}

function ThemeEffect() {
  useTheme();
  return null;
}

function App() {
  return (
    <Router>
      <TabsProvider>
        <AuthBridge />
        <TabsSyncer />
        <ThemeEffect />
        <CommandPalette />
        <div className="app-shell">
          <TabBar />
          <div className="main-style">
            <Routes>
              <Route exact path="/" element={<HomeIndex />} />
              <Route path="/login" element={<LoginIndex />} />
              <Route path="/register" element={<RegisterIndex />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/dragpage" element={<DragPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </TabsProvider>
    </Router>
  );
}

export default App;