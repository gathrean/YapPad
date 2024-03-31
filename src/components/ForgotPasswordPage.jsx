import { useParams } from 'react-router-dom';

import '../style/LoginPage.css';
import '../App.css';
import logo from '../assets/images/logo.png';
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleRequest = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/auth/forgot-password', {
                email: email,
            });
            setSuccess('Email sent successfuly!')
            console.log('Reset successful.', response.data);
        } catch (error) {
            console.error('Reset failed:', error.message);
            setError('Something went wrong!');
        }
    };

    return <div className="login-container">
        <form onSubmit={handleRequest} className="login-form">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="login-logo" />
            </div>
            <h2>Forgot Password?</h2>
            <div className="input-group">
                <label htmlFor="email">Email</label>
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
            <button type="submit" className="login-button">Request Reset</button>
        </form>
    </div>
}