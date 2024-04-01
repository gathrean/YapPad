/// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// Backend Imports
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Context Imports
import { useAuth } from './AuthContext.jsx';
import { navbarMessages } from '../lang/messages/user';

// Bootstrap Imports / Frontend
import YapPadLogo from '../assets/images/yappad-logo.png';
import "../style/Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function YapPadNavbar() {
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
        <Navbar collapseOnSelect expand="lg" className="navbar-yappad">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-yappad">
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
                        <Nav.Link className="navlink-yapped" as={Link} to="/chamber">{navbarMessages.yappingChamber}</Nav.Link>
                        <Nav.Link className="navlink-yapped" as={Link} to="/home">{navbarMessages.yap}</Nav.Link>
                        <Nav.Link className="navlink-yapped" as={Link} to="/settings">{navbarMessages.settings}</Nav.Link>
                        {isAdmin && <Nav.Link className="navlink-yapped" as={Link} to="/admin">{navbarMessages.admin}</Nav.Link>}
                        {isLoggedIn ? (
                            <Nav.Link className="navlink-yapped" onClick={handleSignOut}>{navbarMessages.signOut}</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link className="navlink-yapped" as={Link} to="/login">{navbarMessages.login}</Nav.Link>
                                <Nav.Link className="navlink-yapped" as={Link} to="/signup">{navbarMessages.getStarted}</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default YapPadNavbar;