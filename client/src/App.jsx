import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      const generatedPrompt = buildPrompt(formula);
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <ImageCarousel direction="right" />
        <ImageCarousel direction="left" />
      </motion.div>
      <ScrollIndicator />
      
      <div className="hero-section" id="hero">
        <div className="hero-container">
          <motion.div 
            className="hero-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Ad Creative & Marketing: <br />
              <span className="gradient-text">Visuals Engine</span>
            </h1>
            <p className="hero-description">
              Stop wasting budget on standard visuals. Use our deterministic prompt engine to craft the perfect, high-converting product backdrops and ad creatives in seconds tailored entirely to your brand.
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
          </motion.div>

          <motion.div 
            className="hero-right"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="showcase-card">
              <img src="/carousel-images/img9.png" alt="AI Generated Astronaut" className="hero-showcase-img" />
              <div className="showcase-glow"></div>
            </div>
          </motion.div>
        </div>

        <div className="hero-container2 workbench-section">
          <motion.div 
            className="hero-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="workbench-header">
              <span className="workbench-badge">AI Studio</span>
              <h2 className="workbench-title">Craft Your Masterpiece</h2>
              <p className="workbench-subtitle">Configure your generation parameters with precision.</p>
            </div>

            <div className="hero-form-wrapper">
              <PromptForm 
                onGenerate={handleGenerate} 
                isLoading={isLoading} 
                styles={styles}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container2">
        <main>
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card error-container" 
                style={{color: '#ef4444', marginTop: '1rem'}}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
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
