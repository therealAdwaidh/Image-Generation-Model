import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle, Image as ImageIcon, Download, AlertCircle } from 'lucide-react';

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

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return 90;
        return prev + 5;
      });
    }, 500);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const blob = await response.blob();
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

  useEffect(() => {
    return () => {
      if (image && image.startsWith('blob:')) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  if (!prompt) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
      className="glass-card result-area"
    >
      <div className="result-container relative">
        <motion.div 
          className="result-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-start mb-3 border-b border-gray-800 pb-2">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Generated Prompt</span>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="copy-btn-subtle flex items-center gap-1 text-gray-400 hover:text-white transition-colors" 
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <CheckCircle size={14} className="text-green-400" /> <span className="text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} /> <span className="text-xs">Copy</span>
                </>
              )}
            </motion.button>
          </div>
          <div className="text-lg leading-relaxed text-gray-200">
            {prompt}
          </div>
        </motion.div>
      </div>

      <motion.button 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(168, 85, 247, 0.25)" }}
        whileTap={{ scale: 0.98 }}
        className="visualize-btn-large" 
        onClick={generateImage} 
        disabled={loadingImage}
      >
        <ImageIcon size={22} className="btn-icon" /> <span className="btn-text">Visualize</span>
      </motion.button>

      <AnimatePresence>
        {loadingImage && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="progress-container"
          >
            <motion.div 
              className="progress-bar" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
            <div className="progress-text">Generating... {progress}%</div>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="error-message flex items-center gap-2" 
            style={{ 
              color: '#ff3d6e', 
              marginTop: '1.5rem', 
              padding: '1rem 1.25rem', 
              background: 'rgba(255, 61, 110, 0.05)', 
              border: '1px solid rgba(255, 61, 110, 0.3)',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              boxShadow: '0 0 15px rgba(255, 61, 110, 0.1) inset'
            }}
          >
            <AlertCircle size={18} className="text-[#ff3d6e]" /> {error}
          </motion.div>
        )}

        {(image && !loadingImage && !error) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="generated-image-container group"
          >
            <img 
              src={image} 
              alt="AI Generated" 
              className="generated-image transition-transform duration-500 group-hover:scale-105"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="image-overlay"
            >
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={image} 
                download="imaginator-ai-image.png" 
                className="download-btn"
              >
                <Download size={20} /> Download Image
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}