/// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import { useParams, useSearchParams } from 'react-router-dom';
import '../style/LoginPage.css';
import '../App.css';
import logo from '../assets/images/logo.png';
import { useState } from 'react';
import axios from 'axios';
import { resetPasswordPageMessages } from '../lang/messages/user'; 

export default function ResetPasswordPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRequest = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/auth/reset-password', {
                email: searchParams.get("email"),
                token: searchParams.get("token"),
                password: password,
            });
            setSuccess(resetPasswordPageMessages.resetPasswordSuccess);
            console.log('Reset successful.', response.data);
        } catch (error) {
            console.error('Reset failed:', error.message);
            setError(resetPasswordPageMessages.resetPasswordError);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleRequest} className="login-form">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="login-logo" />
                </div>
                <h2>{resetPasswordPageMessages.resetPasswordHeading}</h2>
                <div className="input-group">
                    <label htmlFor="password">{resetPasswordPageMessages.newPasswordLabel}</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                {success && <p className="alert alert-success">{success}</p>}
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-button">{resetPasswordPageMessages.resetButton}</button>
            </form>
        </div>
    );
}
