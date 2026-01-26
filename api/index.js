import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Styles Data
const STYLES = [
  { id: 'realistic', name: 'Realistic', fragment: 'photorealistic, 8k, highly detailed, cinematic lighting, ultra-realistic textures' },
  { id: 'anime', name: 'Anime', fragment: 'anime style, cel shaded, vibrant colors, studio ghibli inspired, detailed background' },
  { id: 'cyberpunk', name: 'Cyberpunk', fragment: 'cyberpunk aesthetic, neon lights, futuristic city, high tech, rain soaked streets, chromatic aberration' },
  { id: 'oil-painting', name: 'Oil Painting', fragment: 'oil painting style, thick brushstrokes, textures, impasto, masterpiece, traditional art' },
  { id: 'watercolor', name: 'Watercolor', fragment: 'watercolor painting, soft edges, bleeding colors, artistic, ethereal, paper texture' },
  { id: 'fantasy', name: 'Fantasy', fragment: 'fantasy art, magical atmosphere, detailed, epic composition, glowing particles, digital painting' },
  { id: 'sketch', name: 'Sketch', fragment: 'pencil sketch, graphite, rough lines, artistic, monochrome, detailed shading' },
  { id: '3d-render', name: '3D Render', fragment: '3d render, unreal engine 5, octane render, ray tracing, volumetric lighting, subsurface scattering' }
];

const buildPrompt = (formula) => {
  const { subject, action, features, mood, background, styleId } = formula;
  const style = STYLES.find(s => s.id === styleId);
  const styleFragment = style ? style.fragment : '';
  
  let prompt = "";
  const mainSubject = subject ? subject : "a subject";
  const mainAction = action ? ` ${action}` : "";
  
  if (styleFragment) prompt += `${styleFragment}, `;
  prompt += `${mainSubject}${mainAction}`;
  if (features) prompt += `, featuring ${features}`;
  if (background) prompt += `, set in ${background}`;
  if (mood) prompt += `, ${mood} atmosphere`;
  
  if (!styleFragment || !styleFragment.includes('high quality')) {
    prompt += `, high quality, detailed, 8k`;
  }

  return prompt;
};

// Endpoints
app.get('/api/styles', (req, res) => {
  res.json(STYLES.map(s => ({ id: s.id, name: s.name })));
});

app.post('/api/generate', async (req, res) => {
  try {
    const prompt = buildPrompt(req.body);
    res.json({ prompt });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate prompt' });
  }
});

app.post('/api/image', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const randomSeed = Math.floor(Math.random() * 1000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&seed=${randomSeed}`;

    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Pollinations API error');

    const imageBuffer = await response.arrayBuffer();
    res.set({
      'Content-Type': response.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000'
    });
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', deployed: 'vercel' });
});

export default app;
