// Backend Imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Frontend Imports
import './App.css';

// Page Imports
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import Chamber from './components/Chamber';
import YapDetail from './components/YapDetail';
import AdminPage from './components/AdminPage';
import SettingsPage from './components/SettingsPage';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// User Authentication Imports
import { AuthProvider } from './components/AuthContext.jsx';
import ResetPasswordPage from './components/ResetPasswordPage.jsx';
import ForgotPasswordPage from './components/ForgotPasswordPage.jsx';

axios.defaults.withCredentials = true

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/chamber" element={<Chamber />} />
          <Route path="/chamber/:id" element={<YapDetail />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
          <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
export default App;
