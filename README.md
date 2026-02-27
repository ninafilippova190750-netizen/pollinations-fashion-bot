# 🕶️ Pollinations Fashion Bot

Telegram bot для генерации luxury fashion изображений с использованием [Pollinations.ai](https://pollinations.ai) API.

## ✨ Возможности

- 🎨 Генерация изображений через Pollinations AI (flux, zimage, klein-large)
- 👓 Акцент на брендовые очки: Cartier, Tom Ford, Chrome Hearts, Gentle Monster
- 👫 Чередование мужских/женских образов
- 🏖 Luxury локации: яхты, пентхаусы, бассейны, суперкары
- 📸 Автоматические скриншоты превью через ScreenshotOne
- ☁️ Загрузка результатов на Beget S3
- 🔄 Ротация тем и промтов через AI

## 🚀 Быстрый старт

### 1. Клонировать репозиторий
```bash
git clone https://github.com/ninafilippova190750-netizen/pollinations-fashion-bot.git
cd pollinations-fashion-bot

2. Настроить конфигурацию
cp .env.example .env
# Отредактируйте .env, вставив ваши ключи

3. Установить зависимости
npm install

4. Запустить бота
npm start

🐳 Запуск через Docker
# Сборка и запуск
docker-compose up -d

# Просмотр логов
docker-compose logs -f pollinations-bot

⚙️ Настройка .env
Переменная                        Описание                          Пример
TELEGRAM_BOT_TOKEN          Токен вашего Telegram бота           123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
POLLINATIONS_API_KEY        API ключ Pollinations                sk_your_key_here
POLLINATIONS_MODEL          Модель для генерации                 flux, zimage, klein-large
SCREENSHOTONE_API_KEY       Ключ ScreenshotOne                   your_key
S3_*                        Настройки Beget S3                   см. .env.example

📊 Система пыльцы Pollinations
Этот проект использует Pollinations API, что помогает повысить уровень вашего GitHub-аккаунта в системе pollen.pollinations.ai:
✅ Публичный репозиторий с упоминанием Pollinations
✅ Активное использование API в production
✅ Регулярные коммиты = больше пыльцы/день

🛠️ Разработка
# Режим разработки с авто-перезагрузкой
npm run dev

🤝 Contributing
Fork репозиторий
Создайте feature branch (git checkout -b feature/amazing-feature)
Commit изменения (git commit -m 'Add amazing feature')
Push на branch (git push origin feature/amazing-feature)
Откройте Pull Request

📄 License
MIT License — feel free to use in your projects!

Made with ❤️ for the Pollinations community