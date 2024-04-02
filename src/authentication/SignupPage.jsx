// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Contexts
import { useAuth } from "./AuthContext";
import { signupPageMessages } from "../lang/messages/user";

// CSS and Assets
import "../style/SignupPage.css";
import "../App.css";
import logo from "../assets/images/logo.png";

// API
import { API_BASE } from "../api_constants";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigateTo = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE}/auth/register`, {
        username,
        email,
        password,
      });
      console.log("Signup successful.", response.data.message);
      document.cookie = `token=${response.data.token}; Path=/; HttpOnly`;
      login(); // Use http-only cookie to sign user in
      navigateTo("/home"); // Redirect to home page
    } catch (error) {
      console.error("Signup failed:", error.message);
      setErrorMessage(
        error.response && error.response.data && error.response.data.error === "User already exists"
          ? signupPageMessages.userAlreadyExistsError
          : signupPageMessages.signupError
      );
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="signup-logo" />
        </div>
        <h2>{signupPageMessages.signupHeading}</h2>

        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        <div className="input-group">
          <label htmlFor="email">{signupPageMessages.emailLabel}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">{signupPageMessages.usernameLabel}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">{signupPageMessages.passwordLabel}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="signup-button">{signupPageMessages.signupButton}</button>
        <Link to="/login" className="login-link">{signupPageMessages.loginLinkText}</Link>
      </form>
    </div>
  );
}

export default SignupPage;
