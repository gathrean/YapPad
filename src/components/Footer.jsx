import React from 'react';
import '../style/Footer.css';
import { footerMessages } from '../lang/messages/user'; 

function Footer() {
    return (
        <footer className="footer">
            <p>{footerMessages.copyrightText}</p>
        </footer>
    );
}

export default Footer;
