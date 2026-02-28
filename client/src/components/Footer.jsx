import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-section mb-4">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="logo-text">AdCreative Engine</span>
            </div>
            <p className="brand-pitch">
              The premier deterministic prompt engine for high-converting marketing visuals and ad creatives.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">𝕏</a>
              <a href="#" className="social-icon">📸</a>
              <a href="#" className="social-icon">💬</a>
            </div>
          </div>
          
          <div className="footer-links-grid">
            <div className="link-column">
              <h4 className="column-title">Product</h4>
              <a href="#" className="footer-link">AI Models</a>
              <a href="#" className="footer-link">Product Backdrops</a>
              <a href="#" className="footer-link">Ad Creatives</a>
              <a href="#" className="footer-link">Pricing</a>
            </div>
            <div className="link-column">
              <h4 className="column-title">Company</h4>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
            <div className="link-column">
              <h4 className="column-title">Resources</h4>
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Community</a>
              <a href="#" className="footer-link">API Access</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2026 AdCreative Engine. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#" className="bottom-link">Privacy Policy</a>
            <a href="#" className="bottom-link">Terms of Service</a>
            <a href="#" className="bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
