// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

// CSS and Assets
import '../style/LandingPage.css';
import '../App.css';
import logo from '../assets/images/logo.png';

function LandingPage() {
  let navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1>Welcome to YapPad</h1> 
        <div className="button-container">
          <button className="login-button" onClick={handleLoginClick}>Login</button>
          <button className="login-button" onClick={handleSignupClick}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
