// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React from 'react';
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

    const handleSignOut = async () => {
        try {
            await axios.post(`${API_BASE}/auth/logout`);
            logout();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };
    // Conditionally set the 'to' prop of Navbar.Brand
    const brandLink = isLoggedIn ? '/home' : '/';

    return (
        <Navbar collapseOnSelect expand="lg" className="navbar-yappad">
            <Container>
                <Navbar.Brand as={Link} to={brandLink} className="brand-yappad">
                    <img
                        src={YapPadLogo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="YapPad Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link className={`navlink-yappad ${window.location.pathname === '/home' ? 'active' : ''}`} as={Link} to="/home">{navbarMessages.yap}</Nav.Link>
                                <Nav.Link className={`navlink-yappad ${window.location.pathname === '/chamber' ? 'active' : ''}`} as={Link} to="/chamber">{navbarMessages.yappingChamber}</Nav.Link>
                                <Nav.Link className={`navlink-yappad ${window.location.pathname === '/settings' ? 'active' : ''}`} as={Link} to="/settings">{navbarMessages.settings}</Nav.Link>
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