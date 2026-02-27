const { Telegraf, Markup } = require('telegraf');
const config = require('./config');
const { generatePrompt } = require('./prompt-generator');
const { generateImage } = require('./image-generator');
const { takeScreenshot } = require('./screenshot-service');
const { uploadToS3 } = require('./s3-uploader');
const { generateUniqueId, sleep } = require('./utils');

const bot = new Telegraf(config.telegram.botToken);

// Команды
bot.start((ctx) => {
  ctx.reply(
    '👋 Привет! Я бот для генерации luxury fashion изображений.\n\n' +
    '📸 Отправь мне описание картинки, и я создам:\n' +
    '• Профессиональное изображение с моделью\n' +
    '• Брендовые очки в кадре\n' +
    '• Скриншот превью\n\n' +
    'Пример: "Девушка в шелковой блузке с очками Cartier на яхте в Монако"'
  );
});

bot.help((ctx) => {
  ctx.reply('Отправь описание изображения, и я сгенерирую его через Pollinations.ai API');
});

// Обработка текстовых сообщений
bot.on('text', async (ctx) => {
  const userInput = ctx.message.text;
  const uniqueId = generateUniqueId();
  
  const loadingMsg = await ctx.reply('🎨 Генерирую изображение... Это займёт ~30 секунд');

  try {
    // 1. Генерация промта через AI
    const { prompt, title, caption } = await generatePrompt(userInput);
    
    // 2. Генерация изображения
    const result = await generateImage(prompt, 0);
    
    if (result.success) {
      // Загрузка на S3
      const fileName = `image/${uniqueId}-1.jpeg`;
      const uploadResult = await uploadToS3(result.buffer, fileName, result.contentType);
      
      if (uploadResult.success) {
        await ctx.editMessageText(`✅ Готово!\n\n📌 ${title}\n\n${caption}`);
        
        // Отправка изображения
        await ctx.replyWithPhoto({ source: result.buffer }, {
          caption: `${title}\n\n${caption}`,
          parse_mode: 'HTML'
        });

        // Кнопки
        await ctx.reply('Что дальше?', Markup.inlineKeyboard([
          Markup.button.url('📌 Pinterest', 'https://pinterest.com'),
          Markup.button.url('🛒 Магазин', 'https://t.me/gudshopbot'),
          Markup.button.callback('🔄 Ещё раз', 'regenerate')
        ]));
      }
    }
  } catch (error) {
    console.error('Bot error:', error);
    await ctx.editMessageText('❌ Произошла ошибка при генерации. Попробуйте ещё раз.');
  }
});

// Обработка callback (кнопки)
bot.action('regenerate', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('🔄 Введите новое описание изображения:');
});

// Запуск бота
async function startBot() {
  console.log('🚀 Pollinations Fashion Bot starting...');
  await bot.launch();
  console.log('✅ Bot is running. Press Ctrl+C to stop.');
  
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

startBot().catch(console.error);