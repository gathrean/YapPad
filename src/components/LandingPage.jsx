/// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../style/LandingPage.css';
import '../App.css';

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
          <button className="button" onClick={handleLoginClick}>Login</button>
          <button className="button" onClick={handleSignupClick}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
