import { useState, useEffect } from 'react';

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

  useEffect(() => {
    console.log('PromptForm received styles:', styles);
  }, [styles]);

  const handleChange = (field, value) => {
    setFormula(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formula.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formula.subject.length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }
    
    if (!formula.styleId) {
      newErrors.styleId = 'Please select a style';
    }
    
    // Optional field length validation
    if (formula.action.length > 150) {
      newErrors.action = 'Action must be less than 150 characters';
    }
    if (formula.features.length > 200) {
      newErrors.features = 'Features must be less than 200 characters';
    }
    if (formula.mood.length > 100) {
      newErrors.mood = 'Mood must be less than 100 characters';
    }
    if (formula.background.length > 200) {
      newErrors.background = 'Background must be less than 200 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onGenerate(formula);
    }
  };

  return (
    <div className="glass-card">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Subject - Required */}
          <div className="input-wrapper full-width">
            <label className="input-label">
              Subject <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formula.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="e.g. a majestic dragon, a futuristic cityscape"
              disabled={isLoading}
              autoFocus
            />
            {errors.subject && <div className="error-msg">{errors.subject}</div>}
          </div>

          {/* Style - Required */}
          <div className="input-wrapper full-width">
            <label className="input-label">
              Style <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formula.styleId}
              onChange={(e) => handleChange('styleId', e.target.value)}
              disabled={isLoading || styles.length === 0}
            >
              <option value="">Select a style...</option>
              {styles.map(style => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
            {errors.styleId && <div className="error-msg">{errors.styleId}</div>}
          </div>

          {/* Pose/Action */}
          <div className="input-wrapper">
            <label className="input-label">Pose/Action</label>
            <input
              type="text"
              value={formula.action}
              onChange={(e) => handleChange('action', e.target.value)}
              placeholder="e.g. flying through clouds, standing heroically"
              disabled={isLoading}
            />
            {errors.action && <div className="error-msg">{errors.action}</div>}
          </div>

          {/* Key Features */}
          <div className="input-wrapper">
            <label className="input-label">Key Features</label>
            <input
              type="text"
              value={formula.features}
              onChange={(e) => handleChange('features', e.target.value)}
              placeholder="e.g. glowing eyes, intricate armor"
              disabled={isLoading}
            />
            {errors.features && <div className="error-msg">{errors.features}</div>}
          </div>

          {/* Mood */}
          <div className="input-wrapper">
            <label className="input-label">Mood</label>
            <select
              value={formula.mood}
              onChange={(e) => handleChange('mood', e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select a mood...</option>
              <option value="mysterious">Mysterious</option>
              <option value="epic">Epic</option>
              <option value="serene">Serene</option>
              <option value="dramatic">Dramatic</option>
              <option value="dark and moody">Dark and Moody</option>
              <option value="ethereal">Ethereal</option>
              <option value="whimsical">Whimsical</option>
              <option value="intense">Intense</option>
            </select>
            {errors.mood && <div className="error-msg">{errors.mood}</div>}
          </div>

          {/* Background */}
          <div className="input-wrapper">
            <label className="input-label">Background</label>
            <input
              type="text"
              value={formula.background}
              onChange={(e) => handleChange('background', e.target.value)}
              placeholder="e.g. sunset sky, ancient ruins"
              disabled={isLoading}
            />
            {errors.background && <div className="error-msg">{errors.background}</div>}
          </div>
        </div>

        <button type="submit" className="generate-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner"></span> Generating Prompt...
            </>
          ) : (
            'Generate Prompt'
          )}
        </button>
      </form>
    </div>
  );
}
