import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System instruction for the model
const SYSTEM_PROMPT = `
You are an expert AI Image Prompt Engineer. 
Your goal is to take a few simple keywords and turn them into a comprehensive, high-quality prompt for image generation models like Stable Diffusion, Midjourney, or DALL-E 3.

STRUCTURE OF YOUR OUTPUT:
- Subject Description: Detailed description of the main subject.
- Visual Style: The artistic style (e.g., cyberpunk, oil painting, cinematic, hyper-realistic).
- Environment/Background: Setting and atmosphere.
- Lighting: Specific lighting conditions (e.g., volumetric lighting, neon lights, golden hour).
- Camera/Technical: Camera settings or quality keywords (e.g., 8k, highly detailed, shallow depth of field, wide angle).

RULES:
1. Output ONLY the final generated prompt as a single paragraph of text.
2. Do not include labels like "Subject:", "Style:", etc. Just the prompt text.
3. Keep it comma-separated or descriptive natural language, whichever fits best.
4. If the user input is vague, use your creativity to fill in the gaps to make it "high quality".
5. Do not write any conversational text, just the prompt.

EXAMPLE INPUT: "cyberpunk, dog, rain"
EXAMPLE OUTPUT: "Ultra-detailed cyberpunk-style illustration of a large robotic dog standing in a neon-lit rain-slicked street, heavy rain, reflection of neon signs in puddles, cinematic lighting, futuristic city skyline in background, shallow depth of field, high contrast, digital art, 4k, professional concept art, trending on artstation."
`;

// Prompt generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { keywords } = req.body;
    
    if (!keywords) {
      return res.status(400).json({ error: 'Keywords are required' });
    }
    
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is missing in environment variables');
      return res.status(500).json({ error: 'Server configuration error: API Key missing' });
    }
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT 
    });
    
    const result = await model.generateContent(keywords);
    const response = await result.response;
    const text = response.text();
    
    res.json({ prompt: text.trim() });
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