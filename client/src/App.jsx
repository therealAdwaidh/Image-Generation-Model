import { useState } from 'react';
import PromptForm from './components/PromptForm';
import ResultCard from './components/ResultCard';
import ImageCarousel from './components/ImageCarousel';
import PricingSection from './components/PricingSection';
import FeaturesSection from './components/FeaturesSection';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';
import { STYLES, buildPrompt } from './utils/promptUtils';

function App() {
  const [prompt, setPrompt] = useState('');
  const [styles, setStyles] = useState(STYLES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (formula) => {
    setIsLoading(true);
    setError(null);
    setPrompt('');
    
    try {
      // Use local deterministic logic instead of backend call
      const generatedPrompt = buildPrompt(formula);
      
      // Simulate slight processing for UX
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setPrompt(generatedPrompt);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <Header />
      <ImageCarousel direction="right" />
      <ImageCarousel direction="left" />
      <ScrollIndicator />
      
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-title">
              AI Image Generator: <br />
              <span className="gradient-text">Online Text To Image</span>
            </h1>
            <p className="hero-description">
              Transform your ideas into AI images with the free text to image generator. 
              Just describe what you want and watch the best AI image generator bring your ideas to life. 
              Imaginator can create stunning images in seconds.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">30M+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">63K+</span>
                <span className="stat-label">Discord Community</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">1B+</span>
                <span className="stat-label">Images Processed</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="showcase-card">
              <img src="/carousel-images/img9.png" alt="AI Generated Astronaut" className="hero-showcase-img" />
              <div className="showcase-glow"></div>
            </div>
          </div>
        </div>

        <div className="hero-container2">
          <div className="hero-left">
            

            <div className="hero-form-wrapper">
              <PromptForm 
                onGenerate={handleGenerate} 
                isLoading={isLoading} 
                styles={styles}
              />
            
            </div>

            
          </div>

          <div className="hero-right">
            
          </div>
        </div>
      </div>

      <div className="container2">
        <main>
          {error && <div className="glass-card error-container" style={{color: '#ef4444', marginTop: '1rem'}}>{error}</div>}
          <ResultCard prompt={prompt} />
        </main>
      </div>
      
      <PricingSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}

export default App;
