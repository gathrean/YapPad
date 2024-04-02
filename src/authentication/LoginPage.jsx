/// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Contexts
import { useAuth } from './AuthContext.jsx';
import { loginPageMessages } from '../lang/messages/user.js';

// CSS and Assets
import '../style/LoginPage.css';
import '../App.css';
import logo from '../assets/images/logo.png';

// API
import { API_BASE } from '../api_constants.js';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { login, setIsAdmin } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_BASE}/auth/login`, {
                email,
                password,
            });
            const { user, token } = response.data;
            console.log('Login successful: ', email);
            login({ ...user, token });
            if (user.isAdmin) {
                setIsAdmin(true);
            }
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error.response || error.request || error.message);
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage(loginPageMessages.invalidEmailPasswordError);
                } else {
                    setErrorMessage(loginPageMessages.unexpectedError);
                }
            } else if (error.request) {
                setErrorMessage(loginPageMessages.noResponseError);
            } else {
                setErrorMessage(loginPageMessages.unknownError);
            }
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Navigate to the ForgotPasswordPage component
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="login-logo" />
                </div>
                <h2>{loginPageMessages.loginHeading}</h2>
                <div className="input-group">
                    <label htmlFor="email">{loginPageMessages.emailLabel}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">{loginPageMessages.passwordLabel}</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button">{loginPageMessages.loginButton}</button>
                <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                <Link to="/signup" className="signup-link">{loginPageMessages.signupLinkText}</Link>
            </form>
        </div>
    );
}

export default LoginPage;
