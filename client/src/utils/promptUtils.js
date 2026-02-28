export const STYLES = [
  { id: 'minimalist', name: 'Minimalist Product', fragment: 'clean minimalist background, studio lighting, product photography, high-end commercial style, soft shadows, 8k' },
  { id: 'lifestyle', name: 'Instagram Lifestyle', fragment: 'lifestyle photography, natural sunlight, depth of field, vibrant colors, modern aesthetic, social media influencer style' },
  { id: 'neon-pop', name: 'Neon Pop Art', fragment: 'bold neon colors, high contrast, pop art style, energetic, youth marketing, dynamic lighting' },
  { id: 'corporate', name: 'Corporate Flat', fragment: 'corporate flat illustration style, vector art, clean lines, professional, trusting colors, business presentation' },
  { id: 'cyber-tech', name: 'Tech / Cyber', fragment: 'futuristic tech background, glowing blue nodes, dark mode aesthetic, cybersecurity, modern SaaS layout' },
  { id: 'vintage', name: 'Vintage Nostalgia', fragment: 'retro vintage aesthetic, 1970s film grain, nostalgic colors, warm amber lighting, classic advertisement style' },
  { id: 'luxury', name: 'Luxury Premium', fragment: 'luxury mood, dark sleek background, subtle gold accents, high-end brand, sophisticated, professional studio photography' },
  { id: 'editorial', name: 'Fashion Editorial', fragment: 'vogue magazine editorial style, dramatic lighting, high fashion, sharp focus, professional color grading' }
];

export const buildPrompt = (formula) => {
  const { subject, action, features, mood, background, styleId } = formula;
  
  const style = STYLES.find(s => s.id === styleId);
  const styleFragment = style ? style.fragment : '';
  
  let prompt = "";
  
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
  
  if (styleFragment && !styleFragment.includes('high quality')) {
    prompt += `, high quality, detailed, 8k`;
  } else if (!styleFragment) {
    prompt += `, high quality, detailed, 8k`;
  }

  return prompt;
};
