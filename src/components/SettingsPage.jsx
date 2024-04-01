/// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import React from 'react';
import axios from 'axios';
import '../style/Settings.css';
import { settingsMessages } from '../lang/messages/user';

function Settings() {
  return (
    <div className="homepage-container">
      <h1>{settingsMessages.settings}</h1>
      <p>{settingsMessages.settingsDescription}</p>
    </div>
  );
}

export default Settings;