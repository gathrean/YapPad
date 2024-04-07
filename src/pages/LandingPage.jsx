// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS and Assets
import '../style/LandingPage.css';
import '../App.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../authentication/AuthContext';

function LandingPage() {
  let navigate = useNavigate();
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home")
    }
  })

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleDocsClick = () => {
    navigate('/API/v1/docs');
  }

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1>Welcome to YapPad</h1>
        <div className="button-container">
          <button className="landing-button" onClick={handleLoginClick}>Login</button>
          <button className="landing-button" onClick={handleSignupClick}>Get Started</button>
          <button className="landing-button docs" onClick={handleDocsClick}>View API Docs</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
