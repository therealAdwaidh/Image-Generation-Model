import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="features-grid-section">
      <div className="features-grid-container">
        
        {/* Feature 1 */}
        <div className="feature-row">
          <div className="feature-image-side">
            <div className="feature-image-wrapper">
              <img src="/carousel-images/img4.png" alt="Multiple AI Models" className="feature-img" />
              <div className="prompt-overlay">
                <div className="prompt-pill">
                  <span className="prompt-text">Astro...</span>
                  <button className="prompt-gen-btn">
                    <span className="plus-icon">+</span> Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-text-side">
            <h2 className="feature-heading">Multiple AI Models At Your Fingertips</h2>
            <p className="feature-desc">
              Our AI image generator gives you access to a wide range of cutting-edge models like Flux, Flux Dev, Imagen 3, and many more. Whether you're aiming for artistic, hyper-realistic, or experimental results, you can choose the model that best fits your vision. Having multiple options ensures that your AI-generated images match your creative style perfectly.
            </p>
            <button className="feature-btn">
              Generate Now <span className="arrow">↗</span>
            </button>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="feature-row reverse">
          <div className="feature-text-side">
            <h2 className="feature-heading">Generate Images Using A Reference</h2>
            <p className="feature-desc">
              With our AI photo generator, you can upload a reference image to guide your creation. Whether it's for capturing a specific pose, color palette, or visual structure, the AI intelligently interprets your reference to deliver accurate and enhanced results. It's a great way to fine-tune the outcome while still enjoying the freedom of creative input.
            </p>
            <button className="feature-btn">
              Inspire With Image <span className="arrow">↗</span>
            </button>
          </div>
          <div className="feature-image-side">
            <div className="feature-image-wrapper">
              <img src="/carousel-images/img6.png" alt="Reference Image Generation" className="feature-img" />
              <div className="prompt-overlay bottom">
                <div className="prompt-bar-simple">
                  <span className="prompt-char">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
