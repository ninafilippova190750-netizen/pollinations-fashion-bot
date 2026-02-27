const axios = require('axios');
const config = require('./config');

async function takeScreenshot(previewUrl) {
  const params = new URLSearchParams({
    url: previewUrl,
    viewport_width: '1080',
    viewport_height: '1920',
    format: 'jpg',
    block_ads: 'true',
    block_cookie_banners: 'true',
    block_banners_by_heuristics: 'false',
    block_trackers: 'true',
    delay: '0',
    timeout: '60',
    response_type: 'by_format',
    image_quality: '80',
    access_key: config.screenshotOne.apiKey
  });

  const url = `${config.screenshotOne.baseUrl}?${params.toString()}`;

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 60000
    });

    return {
      success: true,
      buffer: Buffer.from(response.data),
      contentType: 'image/jpeg'
    };
  } catch (error) {
    console.error('Screenshot error:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { takeScreenshot };