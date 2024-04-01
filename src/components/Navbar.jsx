/// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './AuthContext.jsx';
import { navbarMessages } from '../lang/messages/user'; 

function Navbar() {
    const { isLoggedIn, isAdmin, logout } = useAuth();
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
                <Link className="navbar-brand" to="/">{navbarMessages.brand}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label={navbarMessages.toggleNavigation}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/chamber">{navbarMessages.yappingChamber}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">{navbarMessages.yap}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/settings">{navbarMessages.settings}</Link>
                                </li>
                                {isAdmin && <li className="nav-item">
                                    <Link className="nav-link" to="/admin">{navbarMessages.admin}</Link>
                                </li>}
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={handleSignOut} style={{ boxShadow: 'none' }}>{navbarMessages.signOut}</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">{navbarMessages.login}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">{navbarMessages.getStarted}</Link>
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
