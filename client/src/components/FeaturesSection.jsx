import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.3 } 
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="features-grid-section">
      <motion.div 
        className="features-grid-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* Feature 1 */}
        <motion.div variants={rowVariants} className="feature-row">
          <div className="feature-image-side" style={{ position: 'relative' }}>
            <div className="feature-image-wrapper" style={{ overflow: 'hidden' }}>
              <img src="/carousel-images/img6.png" alt="Multiple AI Models" className="feature-img" style={{ transition: 'transform 0.7s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
              <div className="prompt-overlay">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="prompt-pill"
                  style={{ boxShadow: '0 0 30px rgba(16, 185, 129,0.3)' }}
                >
                  <span className="prompt-text">Astro...</span>
                  <button className="prompt-gen-btn" style={{ background: 'linear-gradient(to right, #10b981, #06b6d4)', display: 'flex', alignItems: 'center', gap: '4px', border: 'none', cursor: 'pointer', color: 'white' }}>
                    <Sparkles size={14} /> Generate
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="feature-text-side">
            <h2 className="feature-heading">Brand-Aligned Visuals At Scale</h2>
            <p className="feature-desc">
              Our deterministic prompt engine gives you the power to generate endless variations of high-converting product shots and marketing materials. Whether you're aiming for minimalist compositions, modern lifestyle settings, or bold neon aesthetics, you can choose the style that resonates with your brand identity.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className="feature-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Generate Now <ArrowUpRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div variants={rowVariants} className="feature-row reverse">
          <div className="feature-text-side">
            <h2 className="feature-heading">Accelerate Your Creative Workflow</h2>
            <p className="feature-desc">
              Stop spending hours writing and tweaking prompts. By utilizing our structured prompt builder, you define your product, setting, and mood, while our engine constructs the perfect studio-grade prompt behind the scenes. It's the most efficient way to scale your ad creatives.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className="feature-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Inspire With Image <ArrowUpRight size={18} />
            </motion.button>
          </div>
          <div className="feature-image-side" style={{ position: 'relative' }}>
            <div className="feature-image-wrapper" style={{ overflow: 'hidden' }}>
              <img src="/carousel-images/img5.png" alt="Reference Image Generation" className="feature-img" style={{ transition: 'transform 0.7s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
              <div className="prompt-overlay bottom">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="prompt-bar-simple"
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap', boxShadow: '0 0 30px rgba(6, 182, 212,0.2)' }}
                >
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="prompt-char"
                  >
                    A universe and a being...
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default FeaturesSection;
