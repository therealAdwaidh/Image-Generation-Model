import { useState, useEffect } from 'react';

export default function ResultCard({ prompt }) {
  const [copied, setCopied] = useState(false);
  const [image, setImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateImage = async () => {
    setLoadingImage(true);
    setProgress(0);
    setError(null);
    setImage(null);
    
    console.log("Generating image via server API");

    // Start progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          return 90; // Keep at 90 until loaded
        }
        return prev + 5;
      });
    }, 500);

    try {
      const response = await fetch('http://localhost:5000/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      // Get the image as a blob
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      console.log("Image received successfully");
      setImage(url);
      setProgress(100);
      
      setTimeout(() => {
        setLoadingImage(false);
        setProgress(0);
      }, 500);

    } catch (err) {
      clearInterval(progressInterval);
      console.error('Error generating image:', err);
      setLoadingImage(false);
      setProgress(0);
      setError(err.message || "Failed to generate image. Please try again.");
    }
  };

  // Clean up blob URL when component unmounts or when new image is generated
  useEffect(() => {
    return () => {
      if (image && image.startsWith('blob:')) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  if (!prompt) return null;

  return (
    <div className="glass-card result-area" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div className="result-content">
        {prompt}
      </div>
      <div className="action-buttons">
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            </>
          )}
        </button>
        <button className="visualize-btn" onClick={generateImage} disabled={loadingImage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          Visualize
        </button>
      </div>

      {loadingImage && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <div className="progress-text">Generating... {progress}%</div>
        </div>
      )}

      {error && (
        <div className="error-message" style={{ color: '#ef4444', marginTop: '1rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}>
          {error}
        </div>
      )}

      {(image && !loadingImage && !error) && (
        <div className="generated-image-container">
          <img 
            src={image} 
            alt="AI Generated" 
            className="generated-image"
          />
          <div className="image-overlay">
            <a 
              href={image} 
              download="imaginator-ai-image.png" 
              className="download-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
}