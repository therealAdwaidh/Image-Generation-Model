import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, googleSignIn, logout } = useAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

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
          {!currentUser ? (
            <button className="signup-btn" onClick={handleSignIn}>
              Sign In
            </button>
          ) : (
            <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {currentUser.photoURL && (
                <img 
                  src={currentUser.photoURL} 
                  alt="User" 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #3b82f6' }}
                />
              )}
              <button className="login-btn" onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
