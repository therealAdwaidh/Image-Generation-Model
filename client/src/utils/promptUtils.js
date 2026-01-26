export const STYLES = [
  { id: 'realistic', name: 'Realistic', fragment: 'photorealistic, 8k, highly detailed, cinematic lighting, ultra-realistic textures' },
  { id: 'anime', name: 'Anime', fragment: 'anime style, cel shaded, vibrant colors, studio ghibli inspired, detailed background' },
  { id: 'cyberpunk', name: 'Cyberpunk', fragment: 'cyberpunk aesthetic, neon lights, futuristic city, high tech, rain soaked streets, chromatic aberration' },
  { id: 'oil-painting', name: 'Oil Painting', fragment: 'oil painting style, thick brushstrokes, textures, impasto, masterpiece, traditional art' },
  { id: 'watercolor', name: 'Watercolor', fragment: 'watercolor painting, soft edges, bleeding colors, artistic, ethereal, paper texture' },
  { id: 'fantasy', name: 'Fantasy', fragment: 'fantasy art, magical atmosphere, detailed, epic composition, glowing particles, digital painting' },
  { id: 'sketch', name: 'Sketch', fragment: 'pencil sketch, graphite, rough lines, artistic, monochrome, detailed shading' },
  { id: '3d-render', name: '3D Render', fragment: '3d render, unreal engine 5, octane render, ray tracing, volumetric lighting, subsurface scattering' }
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
