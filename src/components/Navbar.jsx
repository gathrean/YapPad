import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    const navigate = useNavigate(); 


    const handleSignOut = async () => {
        try {
            await axios.post('http://localhost:8000/auth/logout');
            navigate('/'); 
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">YapPad</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/chamber">Yapping Chamber</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Yap</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/settings">Settings</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/" onClick={handleSignOut}>Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
