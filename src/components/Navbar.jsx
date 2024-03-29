import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './AuthContext.jsx'; 

function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axios.post('http://localhost:8000/auth/logout');
            logout();
            navigate('/'); 
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
            <div className="container-fluid">
                <div className="navbar-brand" to="/home">YapPad </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/chamber">Yapping Chamber</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Yap</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/settings">Settings</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={handleSignOut} style={{ boxShadow: 'none' }}>Sign Out</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Get Started</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
