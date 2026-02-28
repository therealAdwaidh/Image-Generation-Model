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

app.post('/api/image', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'API key not configured. Please add OPENROUTER_API_KEY to your .env file.' });
    }

    console.log(`Generating image for prompt with OpenRouter (seedream-4.5): "${prompt.substring(0, 50)}..."`);

    // Fetch image from OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "bytedance-seed/seedream-4.5",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        // OpenRouter specific parameter for image generation
        // Although the model might only output images, it's safer to include modalities if expected
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!response.ok) {
      if (data && data.error && data.error.message) {
        throw new Error(`OpenRouter API error: ${response.status} - ${data.error.message}`);
      }
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from OpenRouter: " + JSON.stringify(data).substring(0, 200));
    }

    // Extract base64 image data from response
    let imageUrlOrBase64 = null;
    const message = data.choices[0].message;

    // OpenRouter might return images in a dedicated field or inside markdown in content
    if (message.images && message.images.length > 0) {
      const img = message.images[0];
      // It could be a string or an object with 'url' or 'b64_json'
      imageUrlOrBase64 = typeof img === 'string' ? img : (img.url || img.b64_json || img.base64);
    } 
    
    if (!imageUrlOrBase64 && message.content) {
      const match = message.content.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
      if (match) {
        imageUrlOrBase64 = match[0];
      } else if (message.content.startsWith('data:image')) {
        imageUrlOrBase64 = message.content;
      } else {
        // Sometimes it returns a standard markdown image ![img](url)
        const urlMatch = message.content.match(/!\[.*?\]\((https?:\/\/[^\s]+)\)/) || message.content.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          imageUrlOrBase64 = urlMatch[1];
        }
      }
    }

    if (!imageUrlOrBase64 || typeof imageUrlOrBase64 !== 'string') {
      console.error("OpenRouter response did not contain expected image format:", JSON.stringify(data).substring(0, 500));
      throw new Error("No image data found in OpenRouter response");
    }

    let imageBuffer;
    let mimeType = 'image/png'; // Default

    // Handle standard HTTP URL
    if (imageUrlOrBase64.startsWith('http')) {
      const imageFetchRes = await fetch(imageUrlOrBase64);
      if (!imageFetchRes.ok) throw new Error("Failed to fetch image from returned URL");
      
      const arrayBuffer = await imageFetchRes.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
      mimeType = imageFetchRes.headers.get('content-type') || 'image/jpeg';
    } else {
      // Extract binary data from base64
      const base64Data = imageUrlOrBase64.replace(/^data:image\/\w+;base64,/, "");
      imageBuffer = Buffer.from(base64Data, 'base64');
      
      // Guess mime type based on the base64 string prefix
      const mimeMatch = imageUrlOrBase64.match(/^data:(image\/\w+);base64,/);
      if (mimeMatch) {
        mimeType = mimeMatch[1];
      }
    }

    // Set appropriate headers
    res.set({
      'Content-Type': mimeType,
      'Content-Length': imageBuffer.byteLength,
      'Cache-Control': 'public, max-age=31536000'
    });

    // Send the image buffer
    res.send(imageBuffer);
    
    console.log(`Image generated successfully via OpenRouter (${imageBuffer.byteLength} bytes)`);

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
    openRouterConfigured: !!process.env.OPENROUTER_API_KEY
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Gemini API configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
  console.log(`OpenRouter API configured: ${process.env.OPENROUTER_API_KEY ? 'Yes' : 'No'}`);
});