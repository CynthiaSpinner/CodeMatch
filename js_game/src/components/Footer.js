import React from 'react';
import '../styles/Footer.css';
import trueCodersLogo from '../TrueCodersLogo_OneLineTransparent.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-branding">
          <span className="footer-brand-letter">C</span>
          <span className="footer-brand-gradient">ode</span>
          <span className="footer-brand-letter">S</span>
          <span className="footer-brand-gradient">pinner</span>
          <span className="footer-brand-amp">&</span>
          <span className="footer-brand-letter-small">D</span>
          <span className="footer-brand-gradient-small">esign</span>
        </div>
        <div className="footer-affiliation">
          <span className="affiliation-text">in affiliation with</span>
          <a 
            href="https://truecoders.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="truecoders-logo-link"
          >
            <img 
              src={trueCodersLogo} 
              alt="TrueCoders" 
              className="truecoders-logo"
            />
          </a>
        </div>
        <span className="footer-text">
          © {currentYear} CodeSpinner & Design. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

