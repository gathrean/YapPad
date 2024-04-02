// Backend Imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Frontend Imports
import './App.css';

// Page Imports
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import Chamber from './pages/Chamber.jsx';
import YapDetail from './pages/YapDetail.jsx';
import AdminPage from './pages/AdminPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// User Authentication Imports
import { AuthProvider } from './components/AuthContext.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';

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
          <Route path="/chamber" element={<Chamber />} />
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
