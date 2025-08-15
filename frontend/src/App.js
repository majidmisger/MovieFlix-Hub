// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import MainDashboard from './components/MainDashboard';
import AppNavbar from './components/AppNavbar';
import MovieDetails from './components/MovieDetails';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname.replace('/', '') || 'dashboard');

  const [theme, setTheme] = useState('light');

// Toggle theme
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  document.body.setAttribute('data-theme', newTheme);
};

  // On mount, check if token exists & is not expired
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  const handleLogin = (userData) => {
    if (userData?.token) {
      localStorage.setItem('token', userData.token); // store fresh token
      setIsLoggedIn(true);
      handleNavigate('stats');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/dashboard');
  };

  return (
    <>
      <AppNavbar
        isLoggedIn={isLoggedIn}
        active={activeTab}
        onNavigate={handleNavigate}
        onLogin={() => handleNavigate('login')}
        onLogout={handleLogout}
        toggleTheme={toggleTheme} // pass if you want theme button
      />

      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/stats"
          element={isLoggedIn ? <AnalyticsDashboard /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
