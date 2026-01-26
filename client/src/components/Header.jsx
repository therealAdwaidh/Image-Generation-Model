import React from 'react';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">Imaginator</span>
        </div>
        
        <nav className="header-nav">
          <a href="#models" className="nav-link">Models</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#community" className="nav-link">Community</a>
        </nav>
        
        <div className="header-actions">
          
          <button className="signup-btn">Get Started</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
