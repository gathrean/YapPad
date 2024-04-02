// Backend Imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Frontend Imports
import './App.css';

// Page Imports
import AdminPage from './pages/AdminPage.jsx';
import ChamberPage from './pages/ChamberPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import YapDetail from './components/YapDetail.jsx';

// User Authentication Imports
import { AuthProvider } from './authentication/AuthContext.jsx';
import LoginPage from './authentication/LoginPage.jsx';
import SignupPage from './authentication/SignupPage.jsx';
import ResetPasswordPage from './authentication/ResetPasswordPage.jsx';
import ForgotPasswordPage from './authentication/ForgotPasswordPage.jsx';

axios.defaults.withCredentials = true

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/chamber" element={<ChamberPage />} />
          <Route path="/chamber/:id" element={<YapDetail />} />

          {/* Admin Page */}
          <Route path="/admin" element={<AdminPage />} />

          {/* User Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
          <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
export default App;
