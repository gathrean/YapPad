// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React from 'react';

// Contexts
import { footerMessages } from '../lang/messages/user';

// CSS and Assets
import '../style/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>{footerMessages.copyrightText}</p>
        </footer>
    );
}

export default Footer;
