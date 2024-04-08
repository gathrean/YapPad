// React and Libraries
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS and Assets
import '../style/LandingPage.css';
import '../App.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../authentication/AuthContext';
import { landingPageMessages } from "../lang/messages/user";

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
          <button className="landing-button" onClick={handleLoginClick}>{landingPageMessages.login}</button>
          <button className="landing-button" onClick={handleSignupClick}>{landingPageMessages.getStarted}</button>
          <button className="landing-button docs" onClick={handleDocsClick}>{landingPageMessages.viewAPIDocs}</button>
        </div>
        <h1>{landingPageMessages.emoji}</h1>
        <h1>{landingPageMessages.whatIsYap}</h1>
        <p className="yap-definition">
          <p className="yap-definition" dangerouslySetInnerHTML={{ __html: landingPageMessages.yapDefinition }}></p>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;