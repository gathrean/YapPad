/// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import { useState } from 'react';
import axios from 'axios';

import '../style/LoginPage.css';
import '../App.css';
import logo from '../assets/images/logo.png';
import { forgotPasswordMessages } from '../lang/messages/user'; 
import { API_BASE } from '../api_constants';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRequest = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${API_BASE}/auth/forgot-password`, { email });
            setSuccess(forgotPasswordMessages.emailSentSuccess); 
            console.log('Reset successful.', response.data);
        } catch (error) {
            console.error('Reset failed:', error.message);
            setError(forgotPasswordMessages.somethingWentWrongError); 
        }
    };

    return <div className="login-container">
        <form onSubmit={handleRequest} className="login-form">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="login-logo" />
            </div>
            <h2>{forgotPasswordMessages.pageTitle}</h2>
            <div className="input-group">
                <label htmlFor="email">{forgotPasswordMessages.emailLabel}</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="current-email"
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="alert alert-success">{success}</p>}
            <button type="submit" className="login-button">{forgotPasswordMessages.requestResetButton}</button>
        </form>
    </div>;
}
