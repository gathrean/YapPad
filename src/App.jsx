// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

// CSS and Assets
import './App.css';

// Page Imports
import NotFound from './pages/404Page.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ChamberPage from './pages/ChamberPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import SwaggerDocs from './pages/SwaggerDocs.jsx';

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chamber" element={<ChamberPage />} />
          <Route path="/chamber/:id" element={<YapDetail />} />
          <Route path="/API/v1/docs" element={<SwaggerDocs />} />

          {/* Admin Page */}
          <Route path="/admin" element={<AdminPage />} />

          {/* User Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;