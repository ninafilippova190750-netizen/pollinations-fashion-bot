const axios = require('axios');
const config = require('./config');

const NEGATIVE_PROMPT = "bad hands, extra fingers, fused fingers, deformed hands, bad anatomy, extra limbs, asymmetrical glasses frame, crooked lenses, blurry lens details, plastic looking materials, cheap reflections, text, watermark, signature, logo overlay, cartoon, anime, sketch, painting, illustration, 3d render, cgi";

async function generateImage(prompt, seed = 0) {
  const params = new URLSearchParams({
    model: config.pollinations.model,
    width: config.pollinations.width,
    height: config.pollinations.height,
    nologo: 'true',
    seed: seed.toString(),
    negative_prompt: NEGATIVE_PROMPT,
  });

  if (config.pollinations.enhance) {
    params.append('enhance', 'true');
  }

  const url = `${config.pollinations.baseUrl}/${encodeURIComponent(prompt)}?${params.toString()}`;

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'Authorization': `Bearer ${config.pollinations.apiKey}`
      },
      timeout: 60000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    return {
      success: true,
      buffer: Buffer.from(response.data),
      contentType: response.headers['content-type'] || 'image/jpeg'
    };
  } catch (error) {
    console.error('Image generation error:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { generateImage };