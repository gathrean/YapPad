// Backend Imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Frontend Imports
import './App.css';

// Routing Imports
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage'; 
import Chamber from './components/Chamber';
import AdminPage from './components/AdminPage';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import { AuthProvider } from './components/AuthContext.jsx';

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
            </Routes>
            <Footer /> 
        </Router>
        </AuthProvider>
    );
}
export default App;
