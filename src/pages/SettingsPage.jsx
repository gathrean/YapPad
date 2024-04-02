// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React from 'react';

// CSS and Assets
import '../style/Settings.css';

// Contexts
import { settingsPageMessages } from '../lang/messages/user';

function Settings() {
  return (
    <div className="homepage-container">
      <h1>{settingsPageMessages.settings}</h1>
      <p>{settingsPageMessages.settingsDescription}</p>
    </div>
  );
}

export default Settings;