import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Main Layout is inside Dashboard for now, but we can refactor later) */}
        {/* For now, Dashboard handles the Sidebar and Layout */}
        <Route path="/" element={<Dashboard view="main" />} />
        <Route path="/settings" element={<Dashboard view="settings" />} />
        <Route path="/profile" element={<Dashboard view="profile" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
