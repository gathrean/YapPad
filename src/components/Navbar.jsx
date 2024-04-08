// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// Contexts
import { useAuth } from '../authentication/AuthContext.jsx';
import { navbarMessages } from '../lang/messages/user';
import { API_BASE } from '../api_constants.js';

// CSS and Assets
import "../style/Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import YapPadLogo from '../assets/images/yappad-logo.png';

// React Bootstrap Components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function YapPadNavbar() {
    const { isLoggedIn, isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        if (isLoggedIn) {
            axios.get(`${API_BASE}/auth/authenticate`, { withCredentials: true })
                .then(response => {
                    setCurrentUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [isLoggedIn]);

    const handleSignOut = async () => {
        try {
            await axios.post(`${API_BASE}/auth/logout`);
            logout();
            setCurrentUser(null); // Set currentUser to null when signing out
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const brandLink = isLoggedIn ? '/home' : '/';

    return (
        <Navbar collapseOnSelect expand="lg" className="navbar-yappad">
            <Container>
                <Navbar.Brand as={Link} to={brandLink} className="brand-yappad">
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                        <img
                            src={YapPadLogo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="YapPad Logo"
                        />
                        {currentUser && (
                            <div className="signed-in-container">
                                <span className="navbar-signed-in-as">{navbarMessages.signInAs}</span>
                                <span className="navbar-welcome-message">@{currentUser.username}</span>
                            </div>
                        )}
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link className={`navlink-yappad ${window.location.pathname === '/home' ? 'active' : ''}`} as={Link} to="/home">{navbarMessages.yap}</Nav.Link>
                                <Nav.Link className={`navlink-yappad ${window.location.pathname === '/chamber' ? 'active' : ''}`} as={Link} to="/chamber">{navbarMessages.yappingChamber}</Nav.Link>
                                {isAdmin && <Nav.Link className={`navlink-yappad ${window.location.pathname === '/admin' ? 'active' : ''}`} as={Link} to="/admin">{navbarMessages.admin}</Nav.Link>}
                                <Nav.Link className={`navlink-yappad`} onClick={handleSignOut}>{navbarMessages.signOut}</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link className={`navlink-yappad ${window.location.pathname === '/login' ? 'active' : ''}`} as={Link} to="/login">{navbarMessages.login}</Nav.Link>
                                <Nav.Link className={`navlink-yappad ${window.location.pathname === '/signup' ? 'active' : ''}`} as={Link} to="/signup">{navbarMessages.getStarted}</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default YapPadNavbar;