import { useState } from 'react';

export default function PromptForm({ onGenerate, isLoading }) {
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      onGenerate(keywords);
    }
  };

  return (
    <div className="glass-card">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. samurai, sunset, cyberpunk city"
            disabled={isLoading}
            autoFocus
          />
        </div>
        <button type="submit" className="generate-btn" disabled={isLoading || !keywords.trim()}>
          {isLoading ? (
            <>
              <span className="spinner"></span> Generating...
            </>
          ) : (
            'Generate Prompt'
          )}
        </button>
      </form>
    </div>
  );
}
