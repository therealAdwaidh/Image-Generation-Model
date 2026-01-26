import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { STYLES, getStyleFragment } from './data/styles.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Deterministic Prompt Builder
const buildPrompt = (formula) => {
  const { subject, action, features, mood, background, styleId } = formula;
  
  const styleFragment = getStyleFragment(styleId);
  const parts = [];

  if (styleFragment) parts.push(styleFragment);
  if (subject) parts.push(`Subject: ${subject}`);
  if (action) parts.push(`Action: ${action}`);
  if (features) parts.push(`Features: ${features}`);
  if (mood) parts.push(`Mood: ${mood}`);
  if (background) parts.push(`Background: ${background}`);

  // Construct a flowing sentence structure for better image generation results
  // e.g. "A [style] image of [subject] [action], featuring [features]. The mood is [mood] with a [background] background."
  
  let prompt = "";
  
  // Base subject construction
  const mainSubject = subject ? subject : "a subject";
  const mainAction = action ? ` ${action}` : "";
  
  if (styleFragment) {
    prompt += `${styleFragment}, `;
  }
  
  prompt += `${mainSubject}${mainAction}`;
  
  if (features) {
    prompt += `, featuring ${features}`;
  }
  
  if (background) {
    prompt += `, set in ${background}`;
  }
  
  if (mood) {
    prompt += `, ${mood} atmosphere`;
  }
  
  // Add some high quality keywords at the end if not already present in style
  if (!styleFragment.includes('high quality')) {
    prompt += `, high quality, detailed, 8k`;
  }

  return prompt;
};

// Styles endpoint
app.get('/api/styles', (req, res) => {
  res.json(STYLES.map(s => ({ id: s.id, name: s.name })));
});

// Prompt generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const formula = req.body;
    
    // Basic validation
    if (!formula.subject && !formula.description) { // supporting legacy description/keywords if needed, but primarily subject
       // actually strict validation as per request
    }
    
    const prompt = buildPrompt(formula);
    
    // Simulate processing delay for "Generate Prompt" step feeling significant
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({ prompt });
  } catch (error) {
    console.error('Error generating prompt:', error);
    res.status(500).json({ error: 'Failed to generate prompt' });
  }
});

// Image generation endpoint
app.post('/api/image', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.POLLINATIONS_API_KEY;
    
    if (!apiKey) {
      console.error('POLLINATIONS_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'API key not configured. Please add POLLINATIONS_API_KEY to your .env file.' });
    }

    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);
    const randomSeed = Math.floor(Math.random() * 1000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&seed=${randomSeed}`;

    console.log(`Generating image for prompt: "${prompt.substring(0, 50)}..."`);

    // Fetch image from Pollinations.ai
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.status} ${response.statusText}`);
    }

    // Get the image as a buffer
    const imageBuffer = await response.arrayBuffer();

    // Set appropriate headers
    res.set({
      'Content-Type': response.headers.get('content-type') || 'image/jpeg',
      'Content-Length': imageBuffer.byteLength,
      'Cache-Control': 'public, max-age=31536000'
    });

    // Send the image buffer
    res.send(Buffer.from(imageBuffer));
    
    console.log(`Image generated successfully (${imageBuffer.byteLength} bytes)`);

  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    pollinationsConfigured: !!process.env.POLLINATIONS_API_KEY
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Gemini API configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
  console.log(`Pollinations API configured: ${process.env.POLLINATIONS_API_KEY ? 'Yes' : 'No'}`);
});