require('dotenv').config();

module.exports = {
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
  },
  pollinations: {
    apiKey: process.env.POLLINATIONS_API_KEY,
    model: process.env.POLLINATIONS_MODEL || 'flux',
    width: parseInt(process.env.POLLINATIONS_WIDTH) || 1024,
    height: parseInt(process.env.POLLINATIONS_HEIGHT) || 1792,
    enhance: process.env.POLLINATIONS_ENHANCE === 'true',
    baseUrl: 'https://image.pollinations.ai/prompt',
  },
  screenshotOne: {
    apiKey: process.env.SCREENSHOTONE_API_KEY,
    baseUrl: 'https://api.screenshotone.com/take',
  },
  s3: {
    endpoint: process.env.S3_ENDPOINT,
    bucket: process.env.S3_BUCKET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION || 'ru-1',
  },
  bot: {
    maxImages: parseInt(process.env.MAX_IMAGES_PER_REQUEST) || 5,
    loopDelay: parseInt(process.env.LOOP_DELAY_MS) || 30000,
  },
};