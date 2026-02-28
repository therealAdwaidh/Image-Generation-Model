import React from 'react';

const ScrollIndicator = () => {
  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="scroll-indicator" onClick={scrollToHero} style={{ cursor: 'pointer' }}>
      <div className="mouse">
        <div className="wheel"></div>
      </div>
      <div className="arrow-container">
        <span className="scroll-arrow"></span>
        <span className="scroll-arrow"></span>
      </div>
      <p className="scroll-text">Scroll Down</p>
    </div>
  );
};

export default ScrollIndicator;
