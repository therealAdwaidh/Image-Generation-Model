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
  { id: 'minimalist', name: 'Minimalist Product', fragment: 'clean minimalist background, studio lighting, product photography, high-end commercial style, soft shadows, 8k' },
  { id: 'lifestyle', name: 'Instagram Lifestyle', fragment: 'lifestyle photography, natural sunlight, depth of field, vibrant colors, modern aesthetic, social media influencer style' },
  { id: 'neon-pop', name: 'Neon Pop Art', fragment: 'bold neon colors, high contrast, pop art style, energetic, youth marketing, dynamic lighting' },
  { id: 'corporate', name: 'Corporate Flat', fragment: 'corporate flat illustration style, vector art, clean lines, professional, trusting colors, business presentation' },
  { id: 'cyber-tech', name: 'Tech / Cyber', fragment: 'futuristic tech background, glowing blue nodes, dark mode aesthetic, cybersecurity, modern SaaS layout' },
  { id: 'vintage', name: 'Vintage Nostalgia', fragment: 'retro vintage aesthetic, 1970s film grain, nostalgic colors, warm amber lighting, classic advertisement style' },
  { id: 'luxury', name: 'Luxury Premium', fragment: 'luxury mood, dark sleek background, subtle gold accents, high-end brand, sophisticated, professional studio photography' },
  { id: 'editorial', name: 'Fashion Editorial', fragment: 'vogue magazine editorial style, dramatic lighting, high fashion, sharp focus, professional color grading' }
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

    const headers = {};
    if (process.env.POLLINATIONS_API_KEY) {
      headers['Authorization'] = `Bearer ${process.env.POLLINATIONS_API_KEY}`;
    }

    const response = await fetch(imageUrl, { headers });
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`Pollinations API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    res.set({
      'Content-Type': response.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000'
    });
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: 'Failed to generate image', details: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', deployed: 'vercel' });
});

export default app;
