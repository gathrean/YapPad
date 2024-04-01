import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

import "../style/SignupPage.css";
import "../App.css";
import logo from "../assets/images/logo.png";

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
      const response = await axios.post("http://localhost:8000/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      console.log("Signup successful.", response.data.message);
      document.cookie = `token=${response.data.token}; Path=/; HttpOnly`;
      login(); // use http only cookie to sign user in
      navigateTo("/home"); // redirect to home page
    } catch (error) {
      console.error("Signup failed:", error.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "User already exists"
      ) {
        setErrorMessage("Email already exists. Please try a different email.");
      } else {
        setErrorMessage(
          "An error occurred while signing up. Please try again later."
        );
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="signup-logo" />
        </div>
        <h2>Sign Up</h2>

        {/* Error message shown to user */}
        {errorMessage && (
          <p className="error-message">
            {errorMessage === "User already exists"
              ? "User with this email already exists. Please try a different email."
              : errorMessage}
          </p>
        )}

        <div className="input-group">
          <label htmlFor="email">Email (will be used for Login)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email" // Autocomplete for google chrome
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username" // Autocomplete for google chrome
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" // Autocomplete for google chrome
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <Link to="/login" className="login-link">
          I already have an account
        </Link>
      </form>
    </div>
  );
}

export default SignupPage;
