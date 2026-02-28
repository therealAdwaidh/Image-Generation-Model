import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Loader2, Sparkles, ChevronDown } from 'lucide-react';

export default function PromptForm({ onGenerate, isLoading, styles }) {
  const [formula, setFormula] = useState({
    subject: '',
    action: '',
    features: '',
    mood: '',
    background: '',
    styleId: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [isMoodOpen, setIsMoodOpen] = useState(false);
  
  const styleRef = useRef(null);
  const moodRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (styleRef.current && !styleRef.current.contains(event.target)) {
        setIsStyleOpen(false);
      }
      if (moodRef.current && !moodRef.current.contains(event.target)) {
        setIsMoodOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (field, value) => {
    setFormula(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formula.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formula.subject.length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }
    
    if (!formula.styleId) {
      newErrors.styleId = 'Please select a style';
    }
    
    if (formula.action.length > 150) newErrors.action = 'Action must be less than 150 characters';
    if (formula.features.length > 200) newErrors.features = 'Features must be less than 200 characters';
    if (formula.mood.length > 100) newErrors.mood = 'Mood must be less than 100 characters';
    if (formula.background.length > 200) newErrors.background = 'Background must be less than 200 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onGenerate(formula);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
        className="glass-card relative overflow-visible group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/20 transition-transform duration-500 pointer-events-none"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid stagger-children">
            <motion.div variants={itemVariants} className="input-wrapper full-width">
              <label className="input-label flex items-center gap-2">
                 Subject <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={formula.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="e.g. A cinematic portrait, a futuristic metropolis..."
                disabled={isLoading}
                className="transition-transform focus:scale-[1.01]"
              />
              {errors.subject && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="error-msg">{errors.subject}</motion.div>}
            </motion.div>

            <motion.div variants={itemVariants} className="input-wrapper full-width">
              <label className="input-label">
                Style <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div className="custom-dropdown-container" ref={styleRef}>
                <button
                  type="button"
                  onClick={() => setIsStyleOpen(!isStyleOpen)}
                  disabled={isLoading || styles.length === 0}
                  className={`custom-dropdown-button ${isStyleOpen ? 'open' : ''}`}
                >
                  <span className={formula.styleId ? "text-gray-100" : "text-gray-500"}>
                    {formula.styleId ? styles.find(s => s.id === formula.styleId)?.name : 'Select a style...'}
                  </span>
                  <ChevronDown size={18} style={{ transition: 'transform 0.3s', transform: isStyleOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                
                <AnimatePresence>
                  {isStyleOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="custom-dropdown-menu"
                    >
                      {styles.map(style => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => {
                            handleChange('styleId', style.id);
                            setIsStyleOpen(false);
                          }}
                          className={`custom-dropdown-item ${formula.styleId === style.id ? 'active-style' : ''}`}
                        >
                          {style.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {errors.styleId && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="error-msg mt-2">{errors.styleId}</motion.div>}
            </motion.div>

            <motion.div variants={itemVariants} className="input-wrapper">
              <label className="input-label">Pose/Action</label>
              <input
                type="text"
                value={formula.action}
                onChange={(e) => handleChange('action', e.target.value)}
                placeholder="e.g. Soaring elegantly, casting a dynamic shadow..."
                disabled={isLoading}
                className="transition-transform focus:scale-[1.01]"
              />
              {errors.action && <div className="error-msg">{errors.action}</div>}
            </motion.div>

            <motion.div variants={itemVariants} className="input-wrapper">
              <label className="input-label">Key Features</label>
              <input
                type="text"
                value={formula.features}
                onChange={(e) => handleChange('features', e.target.value)}
                placeholder="e.g. Volumetric lighting, 8k resolution, photorealistic..."
                disabled={isLoading}
                className="transition-transform focus:scale-[1.01]"
              />
              {errors.features && <div className="error-msg">{errors.features}</div>}
            </motion.div>

            <motion.div variants={itemVariants} className="input-wrapper">
              <label className="input-label">Mood</label>
              <div className="custom-dropdown-container" ref={moodRef}>
                <button
                  type="button"
                  onClick={() => setIsMoodOpen(!isMoodOpen)}
                  disabled={isLoading}
                  className={`custom-dropdown-button ${isMoodOpen ? 'mood-open' : ''} capitalize`}
                >
                  <span className={formula.mood ? "text-gray-100" : "text-gray-500"}>
                    {formula.mood || 'Select a mood...'}
                  </span>
                  <ChevronDown size={18} style={{ transition: 'transform 0.3s', transform: isMoodOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                
                <AnimatePresence>
                  {isMoodOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="custom-dropdown-menu"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleChange('mood', '');
                          setIsMoodOpen(false);
                        }}
                        className={`custom-dropdown-item capitalize ${!formula.mood ? 'active-mood' : ''}`}
                      >
                        None
                      </button>
                      {['Mysterious', 'Epic', 'Serene', 'Dramatic', 'Dark and Moody', 'Ethereal', 'Whimsical', 'Intense'].map((mood) => (
                        <button
                          key={mood}
                          type="button"
                          onClick={() => {
                            handleChange('mood', mood.toLowerCase());
                            setIsMoodOpen(false);
                          }}
                          className={`custom-dropdown-item capitalize ${formula.mood === mood.toLowerCase() ? 'active-mood' : ''}`}
                        >
                          {mood}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {errors.mood && <div className="error-msg mt-2">{errors.mood}</div>}
            </motion.div>

            <motion.div variants={itemVariants} className="input-wrapper">
              <label className="input-label">Background</label>
              <input
                type="text"
                value={formula.background}
                onChange={(e) => handleChange('background', e.target.value)}
                placeholder="e.g. A neon-lit cyberpunk street, an ethereal misty forest..."
                disabled={isLoading}
                className="transition-transform focus:scale-[1.01]"
              />
              {errors.background && <div className="error-msg">{errors.background}</div>}
            </motion.div>
          </div>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px' }}
            className="generate-btn" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="spinner" size={20} /> Generating Prompt...
              </>
            ) : (
              <>
                <Sparkles size={20} /> Generate Prompt <Wand2 size={18} />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
  );
}
