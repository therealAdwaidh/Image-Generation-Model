import { useState } from 'react';
import PromptForm from './components/PromptForm';
import ResultCard from './components/ResultCard';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (keywords) => {
    setIsLoading(true);
    setPrompt('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setPrompt(data.prompt);
      } else {
        alert(data.error || 'Failed to generate prompt');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Imaginator</h1>
        <div className="subtitle">Transform words into worlds. Professional AI prompt generator.</div>
      </header>

      <main>
        <PromptForm onGenerate={handleGenerate} isLoading={isLoading} />
        <ResultCard prompt={prompt} />
      </main>
    </div>
  );
}

export default App;
