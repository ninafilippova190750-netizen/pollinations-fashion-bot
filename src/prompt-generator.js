const axios = require('axios');
const config = require('./config');
const { getRandomTopic, getRandomScenario } = require('./topics');

async function generatePrompt(userInput, gender = 'female') {
  const topic = getRandomTopic();
  const scenario = getRandomScenario(gender);

  const systemPrompt = `Ты — креативный директор глянцевого журнала о роскошной жизни. 
Создай профессиональный промт для генерации изображения в стиле luxury fashion.

ПРАВИЛА:
- Модель: ${gender === 'female' ? 'женщина с фигурой "песочные часы"' : 'мужчина с атлетическим телосложением'}
- Очки: обязательно упомянуть бренд, материал оправы (ацетат Mazzucchelli, титан), детали (гравировка, петли)
- Одежда: дорогая, брендовая, с акцентом на текстуры (шелк, лен, кожа)
- Поза: ${scenario.pose}
- Локация: ${scenario.desc}
- Технические требования: 85mm f/1.8, 8k photorealistic, perfect anatomy, 5 fingers
- Формат: 9:16 вертикальный, NO TEXT ON IMAGE

Выведи ТОЛЬКО JSON:
{
  "prompt": "Полный детальный промт на английском для AI image generator",
  "title": "SEO заголовок на русском",
  "caption": "Описание с триггерами и ссылкой https://t.me/gudshopbot"
}`;

  try {
    const response = await axios.post(
      'https://text.pollinations.ai/',
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Тема: ${topic}. Запрос пользователя: ${userInput}` }
        ],
        model: 'mistral-large',
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.pollinations.apiKey}`
        },
        timeout: 30000
      }
    );

    const result = response.data;
    return {
      prompt: result.prompt || result.choices?.[0]?.message?.content || '',
      title: result.title || '',
      caption: result.caption || ''
    };
  } catch (error) {
    console.error('Prompt generation error:', error.message);
    return {
      prompt: `Luxury fashion photography, ${gender} model wearing designer eyewear, ${scenario.desc}, 85mm lens, 8k photorealistic`,
      title: 'Люкс стиль и брендовые очки',
      caption: 'Премиум очки ручной работы. Статус, качество, эксклюзив. https://t.me/gudshopbot'
    };
  }
}

module.exports = { generatePrompt };