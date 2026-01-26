import React from 'react';

const ScrollIndicator = () => {
  return (
    <div className="scroll-indicator">
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
