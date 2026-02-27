FROM node:18-alpine

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Создаём директорию для логов
RUN mkdir -p logs

# Порт для health checks (опционально)
EXPOSE 3000

# Запуск
CMD ["npm", "start"]