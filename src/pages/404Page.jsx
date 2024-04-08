// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Home.css';

const NotFound = () => (
  <div className="homepage-container">
    <h1>404 Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/">Go home</Link>
  </div>
);

export default NotFound;